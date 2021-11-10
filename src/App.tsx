

/**
 * These are the core and essential imports for React, Amplify and GraphQL
 */
import React, { useEffect, useState, SetStateAction } from 'react';
import './App.css';
import Amplify from 'aws-amplify';
// import Amplify, { API, graphqlOperation } from 'aws-amplify';
// import { createTodo } from './graphql/mutations';
// import { listTodos } from './graphql/queries';


/**
 * Authentication
 */
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, AmplifySignOut, AmplifyForgotPassword } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';


/**
 * This code block imports your AWS account settings into the project, including your own credentials. 
 * These have been marked in the gitignore so they will not be added
 * to GitHub when you setup your CI/CD pipeline. This will keep them private while you are deploying. 
 */
import awsExports from './aws-exports';
Amplify.configure(awsExports);

/**
 * The following clode block is part of the State hook; we are using setState()
 * and this is the initial state applied to forms. It allows us to reset the state of the inputs after we click the 
 * button. It gets rid of whatever is there and sets the state to the initial state
 */
//const initialState = { name: '', description: '' }
const App = () => {

  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<any | undefined>()

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);


  return authState === AuthState.SignedIn && user ? (
    <div className="container">
      <h2>
        Amplify Todos
      </h2>
      <h3>
        Hello, {user ? user.username : '!'}
      </h3>
      <p>
        Sign Out
      </p>
    </div>
  ) : (
    <div className="container">
      <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignIn
          slot="sign-in"
          headerText="Please login"
          usernameAlias="email"
          submitButtonText="Log In"
          formFields={[
            {
              type: "email",
              label: 'Please enter your email address',
              placeholder: 'you@domain.com',
              required: true
            },
            {
              type:'password',
              label: 'Please enter your password',
              placeholder: '********',
              required: true
            }
          ]}
        />
        <AmplifySignUp
            slot="sign-up"
            usernameAlias="email"
            headerText="Please sign up here:"
            haveAccountText="Already have an account?"
            submitButtonText="Sign up"
            formFields={[
              {
                type: "email",
                label: "Please enter your email",
                placeholder: "you@domain.com",
                required: true,
              },
              {
                type: "password",
                label: "Plase use a strong password",
                placeholder: "********",
                required: true,
              },
              {
                type: "phone_number",
                label: "Plase enter your phone number",
                placeholder: "123-123-1234",
                required: false,
              },
            ]} 
          />
          <AmplifyForgotPassword
            slot="forgot-password"
            usernameAlias="email"
            headerText="Forgot Password" />
      </AmplifyAuthenticator>
    </div>
  )


  // const [formState, setFormState] = useState(initialState);
  // const [todos, setTodos] = useState([]);

  /**
   * This is for the Effect hook
   * https://reactjs.org/docs/hooks-effect.html
   * 
   * The Effect Hook is meant to be used for subscribing to events, this case, component changing. When we call fetchTodos, it fetches data into the todos array; 
   * the front end will render the items within the todos array in the browser.
   * therefore it will trigger fetchTodos with the useEffect hook
   * 
   * Runs when the page initially loads
   */
  // useEffect(() => {
  //   fetchTodos();
  // }, []);

  // const setInput = (key: any, value: any): any=> {
  //   setFormState({...formState, [key]: value});
  // }

  // const fetchTodos = async (): Promise<any> => {
  //   try{
  //     const todoData:any = await API.graphql(graphqlOperation(listTodos));
  //     const todos:any = todoData.data.listTodos.items;
  //     setTodos(todos);
  //   }catch(err){
  //     console.log('error fetching todos');
  //   }
  // }

  // const addTodos = async (): Promise<any> => {
  //   try{
  //     if(!formState.name || !formState.description) return;
  //     const todo = { ...formState };
  //     setTodos([...todos, todo] as SetStateAction<never[]>);
  //     setFormState(initialState);
  //     await API.graphql(graphqlOperation(createTodo, {input: todo}));
  //   }catch(err){
  //     console.log('error creating a todo item');
  //   }
  // }

  // return (
  //   <div className="container">
  //     <h2>Amplify Todos</h2>
  //     <input 
  //       onChange={event => setInput('name', event.target.value)}
  //       value={formState.name}
  //       placeholder="Name"
  //     />
  //     <input 
  //       onChange={event => setInput('description', event.target.value)}
  //       value={formState.description}
  //       placeholder="Description"
  //     />
  //     <button onClick={addTodos}>Create Todo</button>
  //     {
  //       todos.map((todo: any, index: any) => (
  //         <div key={todo.id ? todo.id : index} className="todo">
  //           <p className="todoName">{todo.name}</p>
  //           <p className="todoDescription">{todo.description}</p>
  //         </div>
  //       ))
  //     }
  //   </div>
  // )

}

export default App;
