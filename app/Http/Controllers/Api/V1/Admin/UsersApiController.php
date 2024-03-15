<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\Admin\UserResource;
use App\Http\Resources\Admin\BuResource;
use App\Models\Role;
use App\Models\User;
use App\Models\Bu;
use App\Models\BuRoleUser;
use App\Models\Dept;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UsersApiController extends Controller
{
    public function home(Request $request)
    {
        $bus = Bu::whereIn('id', auth()->user()->bus->pluck('id'))->get(['id','code','name']);
        $selected_bu = Bu::where('id', $request->selected_bu)->get(['id','code','name']);
        return response()->json([
            'data'  => new BuResource($bus),
            'selected_bu' => [
                'id' => $request->selected_bu === null ? $bus->first()->id : $selected_bu,
                'code' => $request->selected_bu === null ? $bus->first()->code : $selected_bu,
                'name' => $request->selected_bu === null ? $bus->first()->name : $selected_bu
            ],
            'survey' => [
                'has_completed_survey' => auth()->user()->has_completed_survey,
                'link'  => 'https://forms.gle/Jy6Yb6fw5xMMTugv9'
            ]
        ]);
    }


    public function index()
    {
        abort_if(Gate::denies('user_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new UserResource(User::with(['roles','bus','depts'])->advancedFilter()->paginate(request('limit', 10)));
    }

    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->validated());
        foreach($request->bu_roles as $index => $val) {
            BuRoleUser::create(['bu_id' => $val['bu_id'], 'user_id' => $user->id, 'role_id' => $val['role_id']]);
            $user->depts()->syncWithoutDetaching($val['depts']);
        }

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create()
    {
        abort_if(Gate::denies('user_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'meta' => [
                'roles' => Role::whereNot('title','admin')->get(['id', 'title']),
                'bus' => Bu::get(['id', 'code']),
                'depts' => Dept::get(['id', 'code']),
            ],
        ]);
    }

    public function show(User $user)
    {
        abort_if(Gate::denies('user_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new UserResource($user->load(['roles','bus','depts']));
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());
        $depts = [];
        foreach($user->buRoles as $burole) {
            $burole->delete();
        }
        for ($i = 0; $i < count($request->bu_roles); $i++) {
            $buId = $request->bu_roles[$i]['bu_id'];
            $roleId = $request->bu_roles[$i]['role_id'];
            $depts[] = $request->bu_roles[$i]['depts'];
            $buRoles[$buId] = ['role_id' => $roleId, 'user_id' => $user->id];
        }

        $new_depts = [];

        foreach ($depts as $item) {
            foreach ($item as $subItem) {
                if (is_array($subItem) && isset($subItem['id'])) {
                    $new_depts[] = $subItem['id'];
                } elseif (is_numeric($subItem)) {
                    $new_depts[] = $subItem;
                }
            }
        }


        $user->bus()->sync($buRoles);
        $user->depts()->sync($new_depts);

        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(User $user)
    {

        // dd($user->buRoles->toArray());
        abort_if(Gate::denies('user_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $user_id = $user->id;
        $userWithBuRoles = User::with([
            'buRoles' => function ($query) use ($user_id) {
                $query->with(['depts' => function ($subQuery) use ($user_id) {
                    $subQuery->whereHas('users', function ($subSubQuery) use ($user_id) {
                        $subSubQuery->where('user_id', $user_id);
                    });
                }, 'listDepts']);
            },
        ])->find($user_id);

        return response([
            'data' => new UserResource($userWithBuRoles),
            'meta' => [
                'roles' => Role::whereNot('title','admin')->get(['id', 'title']),
                'bus' => Bu::get(['id', 'code']),
                'depts' => Dept::whereIn('bu_id',auth()->user()->bus->pluck('id'))->get(['id', 'code']),
            ],
        ]);
    }

    public function destroy(User $user)
    {
        abort_if(Gate::denies('user_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $user->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function updateUserSurvey()
    {
        $user = auth()->user();
        $user->has_completed_survey = true;
        $user->save();
        return response()->json('success');
    }
}