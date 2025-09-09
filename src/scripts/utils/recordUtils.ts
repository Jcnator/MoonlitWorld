export function getRecordSum(record: Record<string, any>){
    let sum = 0;
    Object.values(record).forEach(item => {
        sum += item.value;
    })
    return sum;
}
