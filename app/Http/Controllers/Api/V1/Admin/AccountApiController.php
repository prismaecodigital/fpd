<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use App\Http\Resources\Admin\AccountResource;
use App\Http\Resources\Admin\BuResource;
use App\Models\Account;
use App\Models\AdditionalLimit;
use App\Models\Bu;
use App\Models\Fpd;
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

    // unused
    public function getOldBalance(Request $request)
    {
        if($request->type == 1) {
            $source_coa = Account::where('id', $request->source_coa_id)->first();
            $source_amount = $request->source_date == '' || empty($source_coa) ? 0 : 
                $source_coa->getProjection($request->source_date) - $source_coa->getCashOutActual($request->source_date) -
                $source_coa->getAmountSourceAdjustment($request->source_date) + $source_coa->getAmountDestinationAdjustmentPeriod($request->source_date);
            $destination_amount = $request->destination_date == '' || empty($source_coa) ? 0 : 
                $source_coa->getProjection($request->destination_date) - $source_coa->getCashOutActual($request->destination_date) -
                $source_coa->getAmountSourceAdjustment($request->destination_date) + $source_coa->getAmountDestinationAdjustmentPeriod($request->destination_date);
        }

        if($request->type == 2) {
            $source_coa = $request->source_coa_id == '' ? '' : Account::where('id', $request->source_coa_id)->first();
            $destination_coa = $request->destination_coa_id == '' ? '' : Account::where('id', $request->destination_coa_id)->first();
            $source_amount = $source_coa == '' ? '' : $source_coa->getProjection($request->source_date) - $source_coa->getCashOutActual($request->source_date);
            $destination_amount = $destination_coa == '' ? '' : $destination_coa->getProjection($request->source_date) - $destination_coa->getCashOutActual($request->source_date);
        }

        return response()->json(['source_amount' => $source_amount ?? 0, 'destination_amount' => $destination_amount ?? 0]);
    }

    public function getBalance(Request $request)
    {
        $source_coa = Account::find($request->source_coa_id);
        $destination_coa = Account::find($request->destination_coa_id);
    
        $source_amount = $source_coa ? $source_coa->getBalance($request->source_date, $request->dept_id) : 0;
        $destination_amount = 1;
        if($request->type == 1) {
            $destination_amount = $source_coa ? $source_coa->getBalance($request->destination_date, $request->dept_id) : 0;
        }
        if($request->type == 2) {
            $destination_amount = $destination_coa ? $destination_coa->getBalance($request->source_date, $request->dept_id) : 0;
        }
    
        return response()->json([
            'source_amount' => $source_amount,
            'destination_amount' => $destination_amount
        ]);
    }

    public function getMaxAmount(Request $request)
    {
        $source_coa = Account::find($request->source_coa_id);
        $source_amount = $source_coa ? $source_coa->getMaxAmount($request->source_date, $request->dept_id) : 0;
        // $additional = AdditionalLimit::where('coa_id', $request->source_coa_id)->whereYear('date', substr($request->source_date,6,4))->whereMonth('date', substr($request->source_date,3,2))->sum('amount');
        // $source_amount = $source_amount + $additional;
        if(!empty($request->fpd_id)) {
            $fpd = Fpd::find($request->fpd_id);
            if($fpd->status >= 5 && isset($request->fpd_item_id)) {
                $item_amount = FpdItem::find('id', $request->fpd_item_id)->amount;
                $source_amount = $source_amount + $item_amount;
            }
        }
        return response()->json([
            'source_amount' => $source_amount,
        ]);
    }

    public function getMaxAmountLrd(Request $request)
    {
        $fpd = Fpd::with('items')->where('id', json_decode($request->items[0])->fpd_id)->first();
        $accountSums1 = [];

        foreach ($fpd->items as $item) {
            $accountId = $item['account_id'];

            if (!isset($accountSums1[$accountId])) {
                $accountSums1[$accountId] = [
                    'amount' => 0,
                ];
            }

            $accountSums1[$accountId]['amount'] += floatval($item->real_amount);
        }

        $accountSums2 = [];
        foreach(($request->items) as $item) {
            $accountId = json_decode($item)->account->id;

            if (!isset($accountSums2[$accountId])) {
                $accountSums2[$accountId] = [
                    'amount' => 0,
                ];
            }

            $accountSums2[$accountId]['amount'] += floatval(json_decode($item)->real_amount);
        }

        $total_max_amount = [];

        foreach($request->items as $index => $item) {
            $source_coa = Account::find(json_decode($item)->account->id);
            $source_amount = $source_coa ? $source_coa->getMaxAmount($request->source_date, $request->dept_id) : 0;
            if (isset($accountSums1[json_decode($item)->account->id]) && isset($accountSums1[json_decode($item)->account->id])) {
                $total_max_amount[$index] = $accountSums1[json_decode($item)->account->id]['amount'] < $accountSums2[json_decode($item)->account->id]['amount'] ?
                        ($source_amount + $accountSums1[json_decode($item)->account->id]['amount']) : 
                        ($source_amount + $accountSums2[json_decode($item)->account->id]['amount']);
            } else {
                $total_max_amount[$index] = $source_amount;
            }
        }

        return response()->json([
            'source_amount' => $total_max_amount,
        ]);
    }
}