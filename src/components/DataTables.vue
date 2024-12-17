<script setup lang="ts">
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-responsive'
import 'datatables.net-select'
import { useContractStore, useNotificationsStore } from '@/stores'
import 'datatables.net-buttons-dt'
import 'datatables.net-buttons/js/buttons.html5.js'
import 'datatables.net-buttons/js/buttons.print.js'
import { useRouter } from 'vue-router'
import DialogModal from '@/components/DialogModal.vue'
import Swal from 'sweetalert2'
import { ref } from 'vue'


interface ContractData {
  contract_name: string;
  company_name: string;
  country: string;
  vendor_name: string;
  category: string;
  start_date: string;
  end_date: string;
  status: number;
  id: number
  file_upload: string
}

const BASE_URL = import.meta.env.VITE_BASE_URL
const contractData = ref<ContractData | null>(null)
const columns = [
  { data: 'contract_name', title: 'Contract' },
  { data: 'company_name', title: 'Company' },
  { data: 'country', title: 'Country' },
  { data: 'vendor_name', title: 'Vendor' },
  { data: 'category', title: 'Category' },
  { data: 'start_date', title: 'Start Date' },
  { data: 'end_date', title: 'Expiry Date' },
  {
    data: 'status',
    title: 'Status',
    render: function(data: string, type: string, row: ContractData) {
      console.log('Status---', row.status, typeof (row.status))
      if (row.status === 1) {
        return `<span class="bg-green-500 text-white rounded-lg px-2 py-1">active</span>`
      } else {
        return `<span class="bg-rose-500 text-white rounded-lg px-2 py-1">expired</span>`
      }
    }
  },
  {
    data: null,
    title: 'Actions',
    orderable: false,
    searchable: false,
    render: function(data: Partial<ContractData>, row: ContractData, type: string) {
      console.log(row.id)
      return `
<div class="flex gap-3 justify-center items-center">
      <button class="edit-btn" data-id="${data.id}"><span class="material-icons-outlined text-AF-500">edit</span></button>
      <button class="download-btn" data-id="${data.id}"><span class="material-icons">file_download</span></button>
      <button class="delete-btn" data-id="${data.id}"><span class="material-icons text-rose-500">delete</span></button>

</div>

      `
    }
  }
]

const exceptedColumns = Array.from({ length: columns.length - 1 }, (v, k) => {
  const arrayLikeObject = { length: columns.length - 1 }
  console.log(arrayLikeObject)
  return k
})


$(document).ready(function() {
  const tableId = 'myTable'
  const tableInit: boolean = $.fn.DataTable.isDataTable(`#${tableId}`)
  console.log('tableInit', tableInit)
  // if(!tableInit){
  //   $(`#${tableId}`).DataTable().destroy()
  // }

  const table = $('#myTable').DataTable({
    columns: columns,
    ajax: {
      url: `${BASE_URL}/contracts`,
      dataSrc: 'contracts'
    },
    select: true,
    dom: '<"flex items-center justify-between"<"w-1/3"l><"w-1/3 text-center"B><"w-1/3 text-right"f>><"mt-8"rt><"flex justify-between pt-4"<"w-1/2"i><"flex justify-endw-1/2"p>>',
    buttons: [
      {
        extend: 'csv',
        className: 'bg-transparent',
        exportOptions: {
          columns: exceptedColumns
        }
      },
      {
        extend: 'print',
        className: 'bg-transparent',
        exportOptions: {
          columns: exceptedColumns
        }
      },
      {
        extend: 'pdf',
        className: 'bg-transparent',
        exportOptions: {
          columns: exceptedColumns
        }
      },
      {
        extend: 'excel',
        className: 'bg-transparent',
        exportOptions: {
          columns: exceptedColumns
        }
      },
      {
        extend: 'print',
        className: 'bg-transparent',
        exportOptions: {
          columns: exceptedColumns
        }
      }
    ],
    responsive: true
  })
  $('#myTable tbody').on('click', '.edit-btn', function() {
    const rowId = $(this).data('id')
    if (rowId) {
      contractData.value = table.row($(this).closest('tr')).data()
      setTimeout(() => {
        router.push({
          name: 'EditContract',
          params: {
            id: contractData.value?.id
          }
        })
      }, 1000)

    }
    // const rowData = table.row($(this).parents('tr')).data()
  })

  $('#myTable tbody').on('click', '.download-btn', function() {
    const rowId = $(this).data('id')
    contractData.value = table.row($(this).closest('tr')).data()
    window.open(`${BASE_URL}/uploads/${contractData.value?.file_upload}`, '_blank')
  })

  $('#myTable tbody').on('click', '.delete-btn', function() {
    const rowId = $(this).data('id')
    contractData.value = table.row($(this).closest('tr')).data()
    contractStore.openDeleteDialog()
  })
})


// DataTable.use(DataTablesCore);
// const data = ref<ContractData []>([]);
const notificationStore = useNotificationsStore()


// {
//     data: null,
//     title: 'Actions',
//     orderable: false,
//     searchable: false,
//     render: function (value: any) {
//       console.log("buttons--",value)
//       return `
// <div id="crud-btn bg-red-500">
//  <button class="edit-btn btn btn-sm btn-ghost z-40"><span class="material-icons text-sky-500">edit</span></button>
//         <button class="download-btn btn btn-sm btn-ghost z-40 download-button"><span class="material-icons">file_download</span></button>
//         <button class="delete-btn btn btn-sm btn-ghost z-40"><span class="material-icons text-rose-500">delete</span></button>
//
// </div>
//        `
//     }
//   }
// ];

const contractStore = useContractStore()
const router = useRouter()
// const contractData = ref<ContractData>()


// const handleSelect = (e, originalEvent) : void=>{
//   if(originalEvent.target.cellIndex === 0){
//     e.preventDefault()
//   }
//   const selectedData = dataTable.value?.rows({selected: true}).data().pluck('id')[0]
//   console.log( selectedData)
// }
// const tableRef = ref(null);
// const dataTable = ref <Api<any>>()
// onMounted(()=>{
//   contractStore.getContracts()
//     .then((resp)=>{
//       console.log(resp)
//       if(resp.result === 'success'){
//         console.log('It is a success')
//         data.value = resp.contracts
//         console.log(data.value)
//       }
//       else{
//         return
//       }
//     })
//   if(tableRef.value){
//    dataTable.value =  new DataTable(tableRef.value, {
//       responsive: true,
//       data: data.value,
//       columns,
//       select: true,
//      dom: 'Bfrtip',
//      layout:{
//         topEnd: {
//           buttons: [
//             {
//               extend: 'copy',
//               text: 'Copy',
//             },
//             {
//               extend: 'csv',
//               text: 'Export to CSV',
//             },
//             {
//               extend: 'excel',
//               text: 'Export to Excel',
//               title: 'Data Export',
//             },
//             {
//               extend: 'pdf',
//               text: 'Export to PDF',
//               title: 'Data Export',
//             },
//             {
//               extend: 'print',
//               text: 'Print',
//               title: 'Print Data',
//             }
//           ]
//         }
//      }
//    })
//     dataTable.value.on('user-select', function(e, dt, type, cell, originalEvent){
//       // console.log('originalEvent', originalEvent)
//       nextTick(()=>{
//         contractData.value = dataTable.value?.rows({selected: true}).data().pop()
//         // console.log(dataTable.value?.rows({selected: true}).data().pop())
//       })
//       if(originalEvent.target.cellIndex === 0){
//         e.preventDefault()
//       }
//     });
//    dataTable.value.on('click', '.edit-btn', function(){
//
//         contractData.value = dataTable.value?.rows({selected: true}).data().pop()
//        console.log(contractData.value)
//        setTimeout(()=>{
//          router.push({
//            name: 'EditContract',
//            params: {
//              id: contractData.value?.id
//            }
//          })
//        }, 1000)
//
//    })
//     dataTable.value.on('click', '.delete-btn', function(){
//       nextTick(()=>{
//         contractData.value = dataTable.value?.rows({selected: true}).data().pop()
//         console.log(contractData.value)
//         contractStore.openDeleteDialog()
//       })
//     })
//     dataTable.value.on('click', '.download-btn', function(){
//
//       nextTick(()=>{
//         contractData.value = dataTable.value?.rows({selected: true}).data().pop()
//         console.log(contractData.value?.file_upload)
//         window.open(`http://localhost:8000/${contractData.value?.file_upload}`, '_blank');
//
//       })
//     })
//   }
// })
//
// // once there is new data we redraw the table
// watch(data, (newData)=>{
//   console.log(newData)
//   if(dataTable.value){
//     dataTable.value.clear()
//     dataTable.value.rows.add(newData)
//     dataTable.value.draw()
//   }
// })
//
const isLoading = ref<boolean>(false)
const handleDelete = () => {
  isLoading.value = true
  contractStore.deleteContract(contractData.value?.id as number)

    .then((resp) => {
      if (resp.result === 'success') {
        // notificationStore.addNotification('Contract deleted successfully', 'success')
        Swal.fire({
          title: 'Deleted!',
          text: 'Contract has been deleted.',
          icon: 'success',
          showConfirmButton: false,
          backdrop: 'swal2-backdrop-show',
          allowOutsideClick: true,
          timer: 1500
        })
        setTimeout(() => {
          window.location.reload()
        }, 2000)

      } else {
        // notificationStore.addNotification('Unable to deleted, please try again', 'error')
        Swal.fire({
          title: 'Error!',
          text: 'Unable to delete contract, please try again',
          icon: 'error',
          showConfirmButton: false,
          backdrop: 'swal2-backdrop-show',
          allowOutsideClick: true,
          timer: 1500
        })
      }

    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      isLoading.value = false
      setTimeout(() => {
        contractStore.closeDeleteDialog()
      }, 1000)
    })
}


</script>

<template>
  <div>
<!--    <div class="md:ms-24 ms-10 sticky top-0 bg-white ">-->
<!--      <h1 class="text-4xl text-AF-500 font-medium">Contracts Section</h1>-->
<!--    </div>-->
    <div class="md:mx-16 ms-10  min-w-80  p-8 shadow-lg rounded-lg">


      <div>
        <table id="myTable" class="display">
          <thead>
          <tr></tr>
          </thead>
          <tbody>
          <tr></tr>
          </tbody>
        </table>
      </div>
      <teleport to="body">
        <DialogModal :is-open="contractStore.isDeleteDialogOpen.isOpen"
                     @close-modal="contractStore.closeDeleteDialog()">
          <template #title>
            <div class="flex justify-center items-center">
              <button class=" btn btn-sm btn-ghost bg-rose-300 btn-circle">
                <span class="material-icons-outlined text-red-500">error_outline</span>
              </button>

            </div>

          </template>
          <template #body>
            <div class="space-y-2">
              <p class="text-center text-normal font-semibold">Deleting {{ contractData?.contract_name }} contract</p>
              <div class="text-sm">
                <p>Are you sure you want to delete <span class="text-rose-500">{{ contractData?.contract_name }}?</span>
                </p>
                <p>Once deleted cannot be recovered</p>
              </div>

            </div>
          </template>
          <template #footer>
            <div class="flex justify-center gap-10">
              <button class="btn btn-sm btn-ghost bg-slate-200 px-8" @click="contractStore.closeDeleteDialog()">Cancel
              </button>
              <button class="btn btn-sm btn-ghost text-white bg-rose-500 px-8" @click="handleDelete">
                <span v-if="isLoading" class="loading loading-spinner loading-md"></span>
                <span v-else>Delete</span>
              </button>

            </div>
          </template>

        </DialogModal>
      </teleport>

    </div>
  </div>

</template>
<style scoped>


</style>