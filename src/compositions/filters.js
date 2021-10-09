import { inject } from 'vue';

export const useFilter = () => {
  const today = inject('today');

  // 날짜별로 정렬 함수
  const fnSort = (a, b) => {
    const a_date = Date.parse(a.date);
    const b_date = Date.parse(b.date);
    if (a_date > b_date) return 1;
    else if (a_date < b_date) return 0;
    else return a.id - b.id;
  }

  // 날짜가 지났지만 완료하지 않은 작업들 필터링
  const getPendingTodos = (todos) => {
    return todos.value.filter(todo => todo.date < today && !todo.completed)
      .slice()
      .sort(fnSort);
  };

  // 오늘 해야 할 작업들 필터링
  const getActiveTodayTodos = (todos) => {
    return todos.value.filter(todo => todo.date === today && !todo.completed)
      .slice()
      .sort(fnSort);
  };

  // 오늘 해야 할 일들 중 완료한 작업들 필터링
  const getCompletedTodayTodos = (todos) => {
    return todos.value.filter(todo => todo.date === today && todo.completed)
      .slice()
      .sort(fnSort);
  };

  // 오늘의 모든 할일 리스트
  const getAllTodayTodos = (todos) => {
    return getActiveTodayTodos(todos)
      .concat(getCompletedTodayTodos(todos))
      .slice()
      .sort(fnSort);
  };

  // 모든 할일 리스트
  const getAllTodos = (todos) => {
    return todos.value.slice().sort(fnSort);
  };

  return {
    getPendingTodos,
    getActiveTodayTodos,
    getCompletedTodayTodos,
    getAllTodayTodos,
    getAllTodos,
  };
};