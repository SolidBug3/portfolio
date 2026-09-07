import { getBudgetInfoQuery } from './queries/get-budget-info'
import { getCreditsQuery } from './queries/get-credits'
import { getDebitsQuery } from './queries/get-debits'

export const queries = {
    'get-budget-info': getBudgetInfoQuery,
    'get-credits': getCreditsQuery,
    'get-debits': getDebitsQuery
}