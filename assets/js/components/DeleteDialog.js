import Dialog from '@material-ui/core/Dialog';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { TodoContext } from '../context/TodoContext';

function DeleteDialog(props) {
  const hide = () => {
    props.setDeleteConfirmationIsShown(false);
  };
  const context = useContext(TodoContext);
  return (
    <Dialog onClose={hide} fullWidth={true} maxWidth="sm" open={props.open}>
      <DialogTitle>Are you sure you wish to delete?</DialogTitle>
      <DialogContent>{props.todo.name}</DialogContent>
      <DialogActions>
        <Button onClick={hide}>Cancel</Button>
        <Button
          onClick={() => {
            context.deleteTodo({ id: props.todo.id });
            hide();
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setDeleteConfirmationIsShown: PropTypes.func.isRequired,
  todo: PropTypes.object,
};
export default DeleteDialog;
