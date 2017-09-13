import { ToastOptions } from 'ng2-toastr';

export class CustomToastOptions extends ToastOptions {
  animate = 'flyRight'; // you can pass any options to override defaults
  newestOnTop = false;
  showCloseButton = true;
  dismiss = 'auto';
  positionClass = 'toast-bottom-right';
}

