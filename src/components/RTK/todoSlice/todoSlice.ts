import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Itodo, ItodoSliceState, Status } from './types';
import axios from 'axios';




const initialState: ItodoSliceState = {
  todo: [],
  loadItem: {},
  status: Status.LOADING,
}

export const fetchTodo = createAsyncThunk<Itodo[]>(
  '@todo/fetchTodo',
  async (_, {rejectWithValue, fulfillWithValue}) => {
    try {
      const response = await axios.get<Itodo[]>(
      `https://jsonplaceholder.typicode.com/todos?_limit=10`
      )
      if (response.status > 299 || response.status < 200) {
        throw new Error("Can't fetch")
      }
      return fulfillWithValue(response.data)
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.message)
    }
    // if (response.status < 299 && response.status > 100) {
    //   return fulfillWithValue(response.data)
      
     
    // } else {
    //   return rejectWithValue(response.status);
    // }
  }
)

type paramsType = {
  id: number;
}

type todosProps = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

// export const fetchDeleteTodo = createAsyncThunk<any, paramsType>(
//   '@todo/fetchDeleteTodo',
//   async (id, { rejectWithValue, fulfillWithValue, dispatch }) => {
//     try {
//       const response = await axios({
//       method: "delete",
//       url: `https://jsonplaceholder.typicode.com/todos/${id}`,
//       })
//       // @ts-ignore
//       if (!response.ok) {
//         throw new Error('can not delete task. Server error')
//       }
//       dispatch(removeTodo(id))
//     } catch (error) {
//       // @ts-ignore
//       return rejectWithValue(error.message)
//     }
//   }
// )

export const fetchDeleteTodo = createAsyncThunk<{id: number}, paramsType>(
  '@todo/fetchDeleteTodo',
  async (id, { rejectWithValue, dispatch, fulfillWithValue }) => {
    try {
      dispatch(todoItemLoading({id}))
      const response = await axios({
      method: "delete",
        url: `https://jsonplaceholder.typicode.com/todos/${id}`,
      
      })
      dispatch(removeTodo(id))
      return id
    } catch (err) {
      return rejectWithValue(err)
    }

      // const response = await axios({
      // method: "delete",
      //   url: `https://jsonplaceholder.typicode.com/todos/${id}`,
      
      // }).then((res) => {
      //   dispatch(removeTodo(id))
      // }).catch((error) => {
        
      // return  rejectWithValue(error.message)
      // }) 
  }
)

  export const toggleStatus = createAsyncThunk<void, {id: number, completed: boolean, title: string}>(
    'todo/toggleStatus',
    async function ({ id, completed, title }, { rejectWithValue, dispatch }) {
      dispatch(todoItemLoading({id}))
      const response = await axios({
      method: "patch",
      url: `https://jsonplaceholder.typicode.com/todos/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id: id,
        completed: !completed,
        title: title
      }
      })

      
      try {
        
        if (response.status > 199 && response.status < 300) {
          dispatch(toggleComplete({ id, completed, title }));
        } else {
          throw new Error
            }
      } catch (err) {
        return rejectWithValue(response.status)
      }

            

        
    }
);

export const fetchAddTodo = createAsyncThunk<any, string>(
  "todo/fetchAddTodo", async function (text, { rejectWithValue, dispatch, fulfillWithValue }) {
    // const todo = {
    //   title: text,
    //   userId: 1,
    //   completed: false,
    //   id: 25125
    // }
    const todo = {
      title: text,
    }
    const reponse = await axios({
      method: "POST",
      url: `https://jsonplaceholder.typicode.com/todos`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(todo)
    }).then((res) => {
      fulfillWithValue(res.statusText)
      dispatch(addTodo(todo.title))
    }).catch((er) => {
      rejectWithValue(er)
    })

  }
)
  
  



export const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.todo.push({
        id: Math.round(Math.random() * 20000),
        title: action.payload,
        completed: false,
      });
    },
    toggleComplete(state, action: PayloadAction<{id: number, title: string, completed: boolean}>) {
      const toggledTodo = state.todo.find(todo => todo.id === action.payload.id);
     
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed
      }
    },
    removeTodo(state, action) {
            state.todo = state.todo.filter(todo => todo.id !== action.payload);
    },
    todoItemLoading(state, action) {
      const todoItem = state.todo.find(todo => todo.id === action.payload.id);
      if (todoItem !== undefined) {
        state.loadItem = todoItem.id
      }
    }
  },
  extraReducers: (builder) => {
    // fetchTodo
    builder.addCase(
      fetchTodo.pending, (state) => {
        state.status = Status.LOADING;
        state.todo = [];
      })
    builder.addCase(
      fetchTodo.fulfilled, (state, action) => {
       
        state.todo = action.payload;
        state.status = Status.SUCCESS;
      
      })
    builder.addCase(
      fetchTodo.rejected, (state, action) => {
        state.status = Status.ERROR;
        alert("НЕ УДАЛОСЬ ЗАГРУЗИТЬ ТУДУ: " + action.payload)
        console.log("fetchTodo rejected, error message:  " + action.error.message)
        console.log(state.status)
      
     
    }
    
    )
    // fetchDeleteTodo
    builder.addCase(
      

      fetchDeleteTodo.rejected, (state, action) => {
        state.loadItem = {}
        console.log(action.error)
    }
      
    )
    builder.addCase(
      fetchDeleteTodo.pending, (state) => {
        state.status = Status.LOADING;
      }
    )
    builder.addCase(
      fetchDeleteTodo.fulfilled, (state) => {
        state.status = Status.SUCCESS;
        state.loadItem = {}
      }
    )
    // toggleStatus
    builder.addCase(
      toggleStatus.pending, (state, action) => {
        
        
    }
    )
        builder.addCase(
      toggleStatus.rejected, (state, action) => {
        console.log(action.error.message)
        state.loadItem = {}
    }
    )
        builder.addCase(
      toggleStatus.fulfilled, (state, action) => {
        state.loadItem = {}
    }
    )
    // addTodo
    builder.addCase(
      fetchAddTodo.fulfilled, (state, action) => {
        console.log(action.payload)
    }
      
    )
    builder.addCase(
      fetchAddTodo.rejected, (state, action) => {
        console.log(action.error, "ACTION ERROR")
        console.log(action.payload, "ACTION PAYLOAD")
      }
    )
  },
  });

export const { toggleComplete, addTodo, removeTodo, todoItemLoading} = todoSlice.actions;

export default todoSlice.reducer;
