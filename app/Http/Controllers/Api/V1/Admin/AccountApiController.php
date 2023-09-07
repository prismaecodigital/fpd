<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use App\Http\Resources\Admin\AccountResource;
use App\Http\Resources\Admin\BuResource;
use App\Models\Account;
use App\Models\Bu;
use App\Models\Dept;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AccountApiController extends Controller
{
    public function index(Request $request)
    {   
        abort_if(Gate::denies('account_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new AccountResource(Account::with(['bu','parent'])->advancedFilter()->where('bu_id', $request->id)->paginate(request('limit', 10)));
    }

    public function list()
    {
        abort_if(Gate::denies('account_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new BuResource(Bu::has('accounts')->advancedFilter()->paginate(request('limit', 10)));
        
    }

    public function store(StoreAccountRequest $request)
    {
        $account = Account::create($request->validated());
        $account->depts()->sync($request->input('depts.*.id', []));

        return (new AccountResource($account))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create(Request $request)
    {
        // dd($request->id);
        abort_if(Gate::denies('account_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'meta' => [
                'bu_id'   => $request->id,
                'bu'   => Bu::where('id', $request->id)->get(['id', 'name']),
                'depts' => Dept::where('bu_id', $request->id)->get(['id', 'name']),
                'parent' => Account::where('bu_id',$request->id)->get(['id','name'])->prepend('-')
            ],
        ]);
    }

    public function show(Request $request, Account $account)
    {
        abort_if(Gate::denies('account_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new AccountResource($account->load(['bu','depts']));
    }

    public function update(UpdateAccountRequest $request, Account $account)
    {
        $account->update($request->validated());
        $account->depts()->sync($request->input('depts.*.id', []));

        return (new AccountResource($account))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(Account $account)
    {
        abort_if(Gate::denies('account_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new AccountResource($account->load(['bu', 'depts'])),
            'meta' => [
                'bu'   => Bu::get(['id', 'name']),
                'depts' => Dept::where('bu_id',$account->bu_id)->get(['id', 'name']),
                'parent' => Account::where('bu_id',$account->bu_id)->get(['id','name'])->prepend('-')
            ],
        ]);
    }

    public function destroy(Account $account)
    {
        abort_if(Gate::denies('account_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $account->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function buaccount(Request $request)
    {
        $bus = $request->input('bu');
        if(gettype($bus) == 'array') {
            $accounts = Account::whereIn('bu_id', $bus)->get();
        }
        if(gettype($bus) == 'string') {
            $accounts = Account::where('bu_id', $bus)->get();
        }
        if(!isset($bus)) {
            $accounts = [''=> 'Select BU First'];
        }

        return response()->json($accounts);
    }

    public function deptaccount(Request $request)
    {
        $dept = $request->input('dept');
        $accounts = Account::whereHas('depts', function ($query) use ($dept) {
            $query->where('dept_id', $dept);
        })->get();

        return response()->json($accounts);
    }
}