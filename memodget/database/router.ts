import { getBudgetInfoQuery } from './queries/get-budget-info'
import { getBudgetIdQuery } from './queries/get-budget-id'
import { getLastBudgetIdQuery } from './queries/get-last-budget-id'
import { getBudgetAmountsQuery } from './queries/get-budget-amounts'
import { getCreditsQuery } from './queries/get-credits'
import { getDebitsQuery } from './queries/get-debits'

export const queries = {
    'get-budget-info': getBudgetInfoQuery,
    'get-budget-id': getBudgetIdQuery,
    'get-last-budget-id': getLastBudgetIdQuery,
    'get-budget-amounts': getBudgetAmountsQuery,
    'get-credits': getCreditsQuery,
    'get-debits': getDebitsQuery
}