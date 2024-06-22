export const changeNumberFormat = (number) =>{
    let formattedWithOptions = number?.toLocaleString('en-IN', { maximumFractionDigits: 0 });
    return formattedWithOptions
  }
export const calculateDiscountedPrice = (price,productDis,categoryDis) =>{
  if(productDis == null && categoryDis == null){
    return price
}else if(productDis != null && categoryDis == null){
    let temp = (price * (100 - productDis))/100
    return temp
}else if(productDis == null && categoryDis != null){
    let temp = (price * (100 - categoryDis))/100
    return temp
}else if(productDis != null && categoryDis != null){
    let greater = productDis > categoryDis?productDis:categoryDis
    let temp = (price * (100 - greater))/100
    return temp
}
}

export const calculateDiscountedTotal = (price,productDis,categoryDis) =>{
  if(productDis == null && categoryDis == null){
    return 1
}else if(productDis != null && categoryDis == null){
    let temp = (price * productDis)/100
    return temp
}else if(productDis == null && categoryDis != null){
    let temp = (price * categoryDis)/100
    return temp
}else if(productDis != null && categoryDis != null){
    let greater = productDis > categoryDis?productDis:categoryDis
    let temp = (price * greater)/100
    return temp
}
}
export function getDateddmmyyy(inputDate) {
    if (inputDate == "" || inputDate == null || inputDate == undefined)
      return inputDate;
    let convertToString = inputDate.toString();
    let customInput = convertToString?.includes("-")
      ? convertToString?.split("-")?.join("")
      : convertToString;
    const year = customInput.substring(0, 4);
    const month = customInput.substring(4, 6);
    const day = customInput.substring(6, 8);
    const outputDate = `${day}-${month}-${year}`;
    return outputDate;
}
export const dateToTextMonth = (dateString) => {
  if(!dateString){
    return dateString;
  }
  const dateObject = new Date(dateString);
  
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = dateObject.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
  return formattedDate
};