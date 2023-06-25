import todoReducer, { fetchTodo, } from '../todoSlice/todoSlice';
import { Status } from './types';



const initialState = {
    todo: [],
    status: Status.LOADING,
}

describe("todoSlice", () => {
    it('should change status with fetchTodos.pending action ', () => {
        // @ts-ignore
        const state = todoReducer(initialState, fetchTodo.pending());
        expect(state.status).toBe(Status.LOADING)
        expect(state.todo).toHaveLength(0)
    })
    it('should change status with fetchTodos.fulfilled action ', () => {
        const todos = [{ id: 1, title: "Todo", completed: false }]
        
        //  Вот этот код const state = todoReducer(initialState, fetchTodo.fulfilled(todos));
        // вот там короче вместо fetchTodo.fulfilled(todos) можно было написать const action = {type: fetchTodos.fulfilled.type, payload: todos,}
        // ^ ну это короче не помню старый редакс, когда ты вручную экшены писал и экспортировал и прокидывал.

        // @ts-ignore
        const state = todoReducer(initialState, fetchTodo.fulfilled(todos));
        // expect(state.status).toBe(Status.SUCCESS)
        // expect(state.todo).toBe(todos);
        expect(state).toEqual({
            todo: todos,
            status: Status.SUCCESS,
        })
    })
    it('should change status with fetchTodos.rejected action ', () => {
        const payload = "Can't fetch"
        // @ts-ignore
        const state = todoReducer(initialState, fetchTodo.rejected("Request failed with status code 404"));
        expect(state).toEqual({
            todo: [],
            status: Status.ERROR
        })
    })
})