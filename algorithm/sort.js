//
const sort = (items, result) => {
  if (result.length === items.length) {
    return;
  }

  while (items.length) {
    const item = items[0];
    let find = false;
    for (let j = 1; j < items.length; j++) {
      if (items[j].priority > item.priority) {
        items.splice(0, 1);
        items.push(item);
        find = true;
        break;
      }
    }

    if (!find) {
      result.push(item.index);
      items.splice(0, 1);
    } else {
      return sort(items, result);
    }
  }
}

while ((line = readline())) {
  const items = line.split(',');
  
  const newItems = items.map((data, index) => ({
    priority: data,
    index,
  }));

  const result = [];

  sort(newItems, result);

  print(result.join(','));
}


