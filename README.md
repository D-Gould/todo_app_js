
- Assuming that this app should be able to accommodate multiple todo lists at one time.
Thus I created a `makeTodoList` function that can be invoked multiple times for multiple todoLists.
- Assuming that when the instructions say,
  "The todoList maintains the integrity of the collection by returning only a copy of the collection anytime that a method returns all or a subset of it and by not allowing users/others objects to manipulate the values of todo objects directly.",
it means that that todoList does not allow users/other objects to manipulate the values of todo objects directly OTHER THAN the add, delete and update operations.
# Assuming the todo fields month and year are not required,
# but if they are provided should be validated so that year >= current year (2019) and month is between 1 & 12
- Assuming todoData are objects with key value pairs for `title`, `month`, `year`, `description` with the values always being strings.
- Assuming that a todoData could NOT include completed field from the start.
- Assuming that the todo method `isWithinMonthYear` should return a boolean based on whether or not the todo's month value === given month value, and year value === given year value
- Assuming there is no validation needed for todoData being initialized or added to the program
- Assuming all inputs are the correct type and do not need to be validated


// change name of makeTodoList to todoList?
// does returning undefined for todoList operations make sense?
