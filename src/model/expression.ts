
const MATCH_GROUPS = /(?<=\()(.*?)(?=\))/g;
const MATCH_OPERATORS = /[+*]/g;

function parseExpression(exp: string) {
    return exp.match(MATCH_GROUPS).map(g => g.split(MATCH_OPERATORS));
}