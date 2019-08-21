
// APPLICATION
function makeTodoList(set) {
  var idNum = 0;
  var ToDo = function(title, month, year, description) {
    this.id = (function() {
      idNum += 1;
      return idNum;
    })();
    this.title = title;
    this.completed = false;
    this.month = month;
    this.year = year;
    this.description = description;

  };
  ToDo.prototype.isWithinMonthYear = function(month, year) {
    month = month || '';
    year = year || ''
    if (typeof month !== "string" && typeof year !== "string" ) {
      console.log("Please try again. Arguments must be strings.")
      return false;
    }
    return (this.month === month && this.year === year);
  };

  var todos = (function() {
    result = [];
    for (i = 0; i < set.length; i += 1) {
      var todo = set[i]
      result.push(new ToDo(todo.title, todo.month, todo.year, todo.description))
    }
    return result;
  })();

  return {
    list: function() {
      return todos.slice();
    },
    add: function(todo) {
      todos.push(todo)
      return todos.slice()
    },
    delete: function(id) {
      var idx = this.findIdxOf(id)
      var todo = todos[idx]
      if (idx >= 0) {
        todos.splice(idx, 1);
        return todo
      } else {
        return undefined;
      }
    },
    update: function(id, property, newValue) {
      var idx = this.findIdxOf(id);
      todos[idx][property] = newValue;
      return todos.slice()
    },
    find: function(id) {
      var idx = this.findIdxOf(id);
      if (idx >= 0) {
        return todos.slice(idx, idx + 1)[0]
      } else {
        return undefined;
      }
    },
    findIdxOf: function(id) {
      for (var i = 0; i < todos.length; i += 1 ) {
        if (todos[i].id === id) {
          return i;
        }
      };
      return undefined;
    },
  }
}
var todoManager = function(list) {
  return {
    all: function() {
      return list.list().slice();
    },
    completed: function() {
      return list.list().filter(function(todo) {
        return todo.completed === true;
      }).slice()
    },
    within: function(month, year) {
      return list.list().filter(function(todo) {
        return todo.isWithinMonthYear(month, year) === true;
      }).slice()
    },
    completedWithin: function(month, year) {
      return this.within(month, year).filter(function(todo) {
        return todo.completed === true;
      })
    }
  }
}

var todoData1 = {
  title: 'Buy Milk',
  month: '1',
  year: '2017',
  description: 'Milk for baby',
};

var todoData2 = {
  title: 'Buy Apples',
  month: '',
  year: '2017',
  description: 'An apple a day keeps the doctor away',
};

var todoData3 = {
  title: 'Buy chocolate',
  month: '1',
  year: '',
  description: 'For the cheat day',
};

var todoData4 = {
  title: 'Buy Veggies',
  month: '',
  year: '',
  description: 'For the daily fiber needs',
};

var todoSet = [todoData1, todoData2, todoData3, todoData4];
var todoList = makeTodoList(todoSet);

// TESTING
var testTodoData1 = {
  title: 'Buy Milk',
  month: '1',
  year: '2017',
  description: 'Milk for baby',
};

var testTodoData2 = {
  title: 'Buy Apples',
  month: '',
  year: '2017',
  description: 'An apple a day keeps the doctor away',
};

var testTodoData3 = {
  title: 'Buy chocolate',
  month: '1',
  year: '',
  description: 'For the cheat day',
};

var testTodoData4 = {
  title: 'Buy Veggies',
  month: '',
  year: '',
  description: 'For the daily fiber needs',
};

var totalPassed = 0;
var totalFailed = 0;

function test(message, assertion) {
  var passed = false;
  try {
    passed = assertion();
  }
  catch (e) {
    passed = false;
  }
  (passed === true) ? totalPassed += 1 : totalFailed += 1
  console.log(passed, message);
};

test("todoList is an object", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  return typeof list === "object";
});

test("todoList can be initialized with todoSet", function() {
  var testTodoSet = [testTodoData1]
  return makeTodoList(testTodoSet) !== undefined;
});

test("todo initializes the collection with n todo objects", function() {
  var testTodoSet = [testTodoData1, testTodoData2, testTodoData3, testTodoData4]
  var list = makeTodoList(testTodoSet);
  return (list.list().length === testTodoSet.length);
});

test("todo has these properties: id, title, completed, month, year, description", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  var todo = list.list()[0];
  return ((todo.id !== undefined) && (todo.title !== undefined) && (todo.completed !== undefined) && (todo.month !== undefined) && (todo.year !== undefined) && (todo.year !== undefined));
});

test("todo has ONLY the properties listed above", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  var todo = list.list()[0];
  return (Object.getOwnPropertyNames(todo).length === 6);
});

test("todo has method #isWithinMonthYear", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  var todo = list.list()[0];
  return (typeof todo.isWithinMonthYear === "function");
});
// todo has ONLY method isWithinMonthYear
test("todo method #isWithinMonthYear returns true if values are equal", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  var todo = list.list()[0];
  return (todo.isWithinMonthYear('1', '2017') === true)
});

test("todo method #isWithinMonthYear returns false if values are NOT equal", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  var todo = list.list()[0];
  return (todo.isWithinMonthYear('2', '2010') === false)
});

test("todo method #isWithinMonthYear returns false if a non-Number is provided as an argument", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  var todo = list.list()[0];
  return (todo.isWithinMonthYear('1', 2017) === false)
});

test("todo method #isWithinMonthYear returns false if one value is NOT equal and one value is equal", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  var todo = list.list()[0];
  return (todo.isWithinMonthYear('1', '2010') === false)
});

test("todo method #isWithinMonthYear returns true one if value is '' ", function() {
  var testTodoSet = [testTodoData3];
  var list = makeTodoList(testTodoSet);
  var todo = list.list()[0];
  return (todo.isWithinMonthYear('1') === true)
});

test("id's of all todos are unique", function() {
  var testTodoSet = [testTodoData1,testTodoData2,testTodoData3,testTodoData4];
  var list = makeTodoList(testTodoSet);
  var ids = []
  list.list().forEach(function(todo) {
    ids.push(todo.id)
  })
  var distinctIds = []
  for (var i = 0; i < ids.length; i += 1) {
    if (!distinctIds.includes(ids[i])) {
      distinctIds.push(ids[i])
    }
  }
  return (ids.length === distinctIds.length)
});

test("todoList returns a copy of the collection, not the actual object", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  return (typeof list !== list.list())
});

test("todoList has add method", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  return (typeof list.add === 'function')
});

test("todoList can add a todo object", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  list.add(testTodoData2)
  return (list.list().length === 2)
});

test("todoList has delete method", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  return (typeof list.delete === 'function')
});

test("todoList can delete a todo object", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  list.delete(1)
  return (list.list().length === 0)
});

test("todoList returns undefined if id isn't found in todo list", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  return (list.delete(2) === undefined)
});

test("todoList can update the description of a todo object with a new string", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  list.update(1, "description", "Milk for grandpa")
  return (list.list()[0].description === "Milk for grandpa")
});

test("todoList can update the completed field of a todo object with a boolean", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  list.update(1, "completed", true)
  return (list.list()[0].completed === true)
});

test("todoList can return a todo object when given it's id", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  return (list.find(1).id === 1)
});

test("todoList returns indefined when you try to find a todo object with an id that doesn't exist", function() {
  var testTodoSet = [testTodoData1];
  var list = makeTodoList(testTodoSet);
  return (list.find(5) === undefined)
});

test("todoManager is defined", function() {
  return typeof todoManager !== "undefined";
});
// todoManager returns a set of todos from todoList
  // All objects returned by todoManager call are in todoList
  // criteria of todoManager call results in correct set of todos
// todoManager returns an array of todo objects when called

test("todoManager can return all todo objects", function() {
  var testTodoSet = [testTodoData1, testTodoData2, testTodoData3, testTodoData4];
  var list = makeTodoList(testTodoSet);

  return (todoManager(list).all().length === testTodoSet.length)
});

test("todoManager returns a copy of the collection, not the actual collection", function() {
  var testTodoSet = [testTodoData1, testTodoData2, testTodoData3, testTodoData4];
  var list = makeTodoList(testTodoSet);

  return (todoManager(list).all() !== testTodoSet);
});

test("todoManager can return all completed todo objects", function() {
  var testTodoSet = [testTodoData1, testTodoData2, testTodoData3, testTodoData4];
  var list = makeTodoList(testTodoSet);
  list.update(2, "completed", true)
  list.update(3, "completed", true)
  return (todoManager(list).completed().length === 2)
});

test("todoManager returns empty array if no todo objects are completed", function() {
  var testTodoSet = [testTodoData1, testTodoData2, testTodoData3, testTodoData4];
  var list = makeTodoList(testTodoSet);
  return (todoManager(list).completed().length === 0)
});

// todoManager can return all todo objects with month = x and year = y
test("todoManager returns all todo objects for a month and year", function() {
  var testTodoSet = [testTodoData1, testTodoData2, testTodoData3, testTodoData4];
  var list = makeTodoList(testTodoSet);
  return (todoManager(list).within("1", "2017").length === 1)
});

test("todoManager returns an empty array if no todo objects match the month and year", function() {
  var testTodoSet = [testTodoData1, testTodoData2, testTodoData3, testTodoData4];
  var list = makeTodoList(testTodoSet);
  return (todoManager(list).within("2", "2017").length === 0)
});

test("todoManager todo objects still match if month and year are blank", function() {
  var testTodoSet = [testTodoData1, testTodoData2, testTodoData3, testTodoData4];
  var list = makeTodoList(testTodoSet);
  return (todoManager(list).within("", "").length === 1)
});
// todoManager can return all todo objects with completed = true, month = x and year = y
test("todoManager can return completed todo objects for a month and", function() {
  var testTodoSet = [testTodoData1, testTodoData2, testTodoData3, testTodoData4];
  var list = makeTodoList(testTodoSet);
  list.update(2, "completed", true)
  list.update(3, "completed", true)
  return (todoManager(list).completedWithin("", "2017").length === 1)
});
// test ("Todo defaults to false if completed isn't provided", function() {
//   var todo = makeToDo()
//   return todo.completed === false;
// })

console.log(totalPassed + " / " + (totalFailed + totalPassed) + " Tests Passed!")
