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
import moment from 'moment'


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
  { data: 'start_date', title: 'Start Date',
  render: function(data: string, type: string, row: ContractData) {
    return moment(row.start_date, 'yyyy-MM-DD').format('DD MMM YYYY')
  }
  },
  { data: 'end_date', title: 'Expiry Date',
  render: function(data: string, type: string, row: ContractData) {
    return moment(row.end_date, 'yyyy-MM-DD').format('DD MMM YYYY')
  }
  },
  {
    data: 'status',
    title: 'Status',
    render: function(data: string, type: string, row: ContractData) {
      console.log('Status---', row.status, typeof (row.status))
      // if (row.status === 1) {
      //   return `<span class="bg-green-500 text-white rounded-lg px-2 py-1">active</span>`
      // } else {
      //   return `<span class="bg-rose-500 text-white rounded-lg px-2 py-1">expired</span>`
      // }
      return `<span class="bg-rose-500 text-white rounded-lg px-2 py-1">expired</span>`
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
<div class="flex gap-3 justify-center items-start">
      <button class="edit-btn" data-id="${data.id}"><span class="material-icons-outlined text-AF-500">edit</span></button>
      <button class="download-btn" data-id="${data.id}"><span class="material-icons">file_download</span></button>
      <button class="delete-btn" data-id="${data.id}"><span class="material-icons text-rose-500">delete</span></button>

</div>

      `
    }
  }
]

const exceptedColumns = Array.from({ length: columns.length - 1 }, (v, k) => {
  return k
})


$(document).ready(function() {
  // const tableId = 'myTable'
  // const tableInit: boolean = $.fn.DataTable.isDataTable(`#${tableId}`)
  // console.log('tableInit', tableInit)
  // if(!tableInit){
  //   $(`#${tableId}`).DataTable().destroy()
  // }



  const table = $('#myTable').DataTable({
    columns: columns,
    ajax: {
      url: `${BASE_URL}/expired-contracts`,
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
    responsive: true,
  })

  // Get total number of expired contracts
  // const tableEntryCount = ref<number>(table.page.info().recordsTotal)

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

const notificationStore = useNotificationsStore()

const contractStore = useContractStore()
const router = useRouter()
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