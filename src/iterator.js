function makeIterator(arr) {
  let nextIndex = 0

  // 返回一个迭代器对象
  return {
    next: () => {
      // next() 方法返回的结果对象
      if (nextIndex < arr.length) {
        return { value: arr[nextIndex],done:false}
      } else {
        return { done: true }
      }
    }
  }
}