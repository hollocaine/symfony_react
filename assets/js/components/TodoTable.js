import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import TableBody from '@material-ui/core/TableBody';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

function TodoTable() {
  const context = useContext(TodoContext);
  const [addTodo, setAddTodo] = useState(''); //Needs to be an empty string cannot be null
  return (
    <form
      onSubmit={() => {
        context.createTodo(event, { name: addTodo });
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField
                value={addTodo}
                onChange={(event) => {
                  setAddTodo(event.target.value);
                }}
                label="New Task"
              />
            </TableCell>
            <TableCell align="right">
              <IconButton type="submit">
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          {context.todos
            .slice()
            .reverse()
            .map((todo, index) => (
              <TableRow key={'Todo' + index}>
                <TableCell>{todo.name}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <EditIcon />
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </form>
  );
}

export default TodoTable;
