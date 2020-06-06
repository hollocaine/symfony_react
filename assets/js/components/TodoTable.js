import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React, { Fragment, useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import TableBody from '@material-ui/core/TableBody';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import TextField from '@material-ui/core/TextField';
import DeleteDialog from './DeleteDialog';

function TodoTable() {
  const context = useContext(TodoContext);
  const [addTodo, setAddTodo] = useState(''); //Needs to be an empty string cannot be null
  const [editIsShown, setEditIsShown] = useState(false);
  const [editTodo, setEditTodo] = useState('');
  const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(
    null
  );
  const [todoTobeDeleted, setTodoTobeDeleted] = useState(
      false
  );

  return (
    <Fragment>
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
                  fullWidth={true}
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
                  <TableCell>
                    {editIsShown === todo.id ? (
                      <TextField
                        fullWidth={true}
                        value={editTodo}
                        onChange={(event) => {
                          setEditTodo(event.target.value);
                        }}
                        InputProps={{
                          endAdornment: (
                            <Fragment>
                              <IconButton
                                onClick={() => {
                                  setEditIsShown(false);
                                }}
                              >
                                <CloseIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => {
                                  context.updateTodo({
                                    id: todo.id,
                                    name: editTodo,
                                  });
                                  setEditIsShown(false);
                                }}
                              >
                                <DoneIcon />
                              </IconButton>
                            </Fragment>
                          ),
                        }}
                      />
                    ) : (
                      todo.name
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setEditIsShown(todo.id);
                        setEditTodo(todo.name);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setDeleteConfirmationIsShown(true);setTodoTobeDeleted()
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </form>
      {deleteConfirmationIsShown && (
        <DeleteDialog todo={todoTobeDeleted} open={deleteConfirmationIsShown} setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}/>>
      )}
    </Fragment>
  );
}

export default TodoTable;
