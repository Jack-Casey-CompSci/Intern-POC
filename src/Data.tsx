import React from 'react';
import { GridCellEditCommitParams, DataGrid, GridRowsProp, GridColDef, GridToolbarQuickFilter, } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import  Axios  from 'axios';
import { GridRowId, GridCellModesModel, } from '@mui/x-data-grid-pro';

interface SelectedCellParams {
  id: GridRowId;
  field: string;
}

interface EditToolbarProps {
  selectedCellParams?: SelectedCellParams;
  cellModesModel: GridCellModesModel;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setCellModesModel: (value: GridCellModesModel) => void;
  cellMode: 'view' | 'edit';
}


const columns: GridColDef[] = [
  { field: 'address', headerName: 'Address', width: 180, editable: true },
    { field: 'size', headerName: 'Size (sq. ft)', type: 'number', width: 120, editable: true },
    {
      field: 'type',
      headerName: 'Asset Type',
      type: 'singleSelect',
      valueOptions: ['Office', 'Industrial'],
      width: 180,
      editable: true
    },
    {
      field: 'market',
      headerName: 'Asset Market', 
      type: 'singleSelect',
      valueOptions: ['Dallas, TX', 'New York, NY', 'Philadelphia, PA', 'Chicago, IL', 'Los Angeles, CA'],
      width: 220,
      editable: true
    },
];

function EditToolbar(props: EditToolbarProps) {

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        p: 1,
      }}
    >
      <Button color="primary" startIcon={<AddIcon />} href = '/addproperty'>
        Add Property 
      </Button>
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter />
      </Box>
    </Box>
  );
}
export default function App() {
  const [propertyList, setPropertyList] = React.useState([])
  const [selectedCellParams, setSelectedCellParams] =
    React.useState<SelectedCellParams | null>(null);
  const [newAddress, setNewAddress] = React.useState("");
  const [size, setNewSize] = React.useState("");
  const [type, setNewType] = React.useState("");
  const [market, setNewMarket] = React.useState("");
  
  const handleCellFocus = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const row = event.currentTarget.parentElement;
      const id = row!.dataset.id!;
      const field = event.currentTarget.dataset.field!;
      setSelectedCellParams({ id, field });
    },
    [],
  );

  React.useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setPropertyList(response.data)
    });
  }, []);

  const handleRowEditCommit =
    (params: GridCellEditCommitParams) => {
        const id = params.id;
        const key = params.field;
        const value = params.value;
        if (key === "address") {
          Axios.put(`http://localhost:3001/api/update/address/${id}`, {
          address: value,
          id: id,
          
        });
        setNewAddress(value)
        }
        if (key === "size") {
          Axios.put(`http://localhost:3001/api/update/size/${id}`, {
            size: value,
            id: id,
        });
        setNewSize(value)
        }
        if (key === "type") {
          Axios.put(`http://localhost:3001/api/update/type/${id}`, {
            type: value,
            id: id,
          
        });
        setNewType(value)
        }
        if (key === "market") {
          Axios.put(`http://localhost:3001/api/update/market/${id}`, {
            market: value,
            id: id,
          
        });
        setNewMarket(value)
        }
      };

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid rows={propertyList} columns={columns}
      onCellEditCommit = {handleRowEditCommit}
       components={{ Toolbar: EditToolbar }}
       />
    </div>
  );
}

