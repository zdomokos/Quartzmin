import { ConfirmationDialogComponent } from './confirmation-dialog.component';

export default {
  title: 'ConfirmationDialogComponent',
};

export const defaultDialog = () => ({
  component: ConfirmationDialogComponent,
  props: {
    text: 'Do you want to proceed?',
    confirmText: 'Yes',
    cancelText: 'No',
  },
});
