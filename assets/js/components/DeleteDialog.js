import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@material-ui/core';

function DeleteDialog(props) {
  return (
    <Dialog open={}>
      <DialogTitle>Are you sure you wish to delete?</DialogTitle>
      <DialogContent>//task</DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.PropTypes = {
  open: PropTypes.bool.isRequired,
};
export default DeleteDialog;
