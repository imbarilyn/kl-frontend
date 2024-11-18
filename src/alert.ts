import Swal from 'sweetalert2'

interface AlertType {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
}

export const showAlert = (alertPayload: AlertType )=>{
  if(alertPayload.type === 'success'){
    Swal.fire({
      title: 'Success',
      text: alertPayload.message,
      icon: 'success',
      confirmButtonText: 'Okay',
      timer: 1500
    })
  }

  else {
    Swal.fire({
      title: 'Error',
      text: alertPayload.message,
      icon: 'error',
      confirmButtonText: 'Okay',
      timer: 1500
    })
  }
}