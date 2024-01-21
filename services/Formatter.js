export const changeNumberFormat = (number) =>{
    let formattedWithOptions = number?.toLocaleString('en-US', { maximumFractionDigits: 0 });
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