export function getRecordSum(record: Record<string, number>){
    let sum = 0;
    Object.values(record).forEach(value => {
        sum += value;
    })
    return sum;
}
