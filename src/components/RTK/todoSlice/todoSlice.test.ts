import { fetchTodo } from "./todoSlice";
import axios from 'axios';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../../App';


// global.fetch = jest.fn();
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>
    
describe("todoThunk", () => {

    

    it('should fetchTodos with resolved response', async () => {
       
        
        const mockTodos = [{
            id: 1, title: "test", completed: false, userId: 1
        }]
        
         
        // @ts-ignore
        // fetch.mockResolvedValue({
           
        //     ok: true,
        //     data: () => Promise.resolve(mockTodos)
        // })

        mockedAxios.get.mockResolvedValue({
            status: 200,
            ok: true,
            data: mockTodos
        })
   

        // await waitFor(() => {
        //     const userList = getAllByRole('items')
        // })

        const dispatch = jest.fn();
        const thunk = fetchTodo();
        
        await thunk(dispatch, () => ({}), () => ({}));

        console.log(dispatch.mock.calls)

        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);
        const [start, end] = calls

        console.log("START 1", start, "START 2")
        console.log("END 1", end, "END 2")
        // посмотри консоль логи, там передается диспатч, не удаляй консоль логи, все станет понятно как посмотришь, для освежения памяти

        // expect(start[0].type).toBe('@todo/fetchTodo/pending') внизу вытаскивают тоже самое, два ниже просто короче типа, яхз, но я бы вот это использовал, чем внизу
        // expect(end[0].type).toBe('@todo/fetchTodo/fulfilled')  внизу если че просто для примера, как еще можно сделать. да и ts ругается.
        // @ts-ignore
        expect(start[0].type).toBe(fetchTodo.pending().type)
        // @ts-ignore
        expect(end[0].type).toBe(fetchTodo.fulfilled().type)
        expect(end[0].payload).toBe(mockTodos)
    });

    // ВТОРОЙ ТЕСТ КОРОЧЕ: статус 200 на 300 поменял в axios, должен в rejected прийти ответ а не в фулфилд, ну ты понял.
   it('shuld fetchTodos with rejected response', async () => {
       
        
        const mockTodos = [{
            id: 1, title: "test", completed: false, userId: 1
        }]
        
         
        // @ts-ignore
        // fetch.mockResolvedValue({
           
        //     ok: true,
        //     data: () => Promise.resolve(mockTodos)
        // })

        mockedAxios.get.mockResolvedValue({
            status: 300,
            
        })
   

        // await waitFor(() => {
        //     const userList = getAllByRole('items')
        // })

        const dispatch = jest.fn();
        const thunk = fetchTodo();
        
        await thunk(dispatch, () => ({}),() => ({}) );

        console.log(dispatch.mock.calls)

        const { calls } = dispatch.mock
        expect(calls).toHaveLength(2);
        const [start, end] = calls

        console.log("START 1", start, "START 2") 
        console.log("END 1", end, "END 2")
        // посмотри консоль логи, там передается диспатч, не удаляй консоль логи, все станет понятно как посмотришь, для освежения памяти

        // expect(start[0].type).toBe('@todo/fetchTodo/pending') внизу вытаскивают тоже самое, два ниже просто короче типа, яхз, но я бы вот это использовал, чем внизу
        // expect(end[0].type).toBe('@todo/fetchTodo/fulfilled')  внизу если че просто для примера, как еще можно сделать. да и ts ругается.
        // @ts-ignore
        expect(start[0].type).toBe(fetchTodo.pending().type)
        // @ts-ignore
        expect(end[0].type).toBe(fetchTodo.rejected().type)
        expect(end[0].payload).toBe("Can't fetch")
    })
})
