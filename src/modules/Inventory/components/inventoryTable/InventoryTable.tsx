import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from '@mui/material/Tooltip';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Popover,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import { HeadCells, headCells } from "../../utils/data-utils";
import "./InventoryTable.scss";
import { InventoryContext } from "../../../context/context";
import { setInventoryData, setWidgetData } from "../../../context/action";

const StyledTableRow = styled(TableRow)({
  "&:last-child td": {
    borderBottom: "none",
  },
  borderBottom: "1px solid #30363db3",
});

const calculateCenterPosition = () => {
  const { innerHeight, innerWidth } = window;
  return {
    top: innerHeight / 2,
    left: innerWidth / 2,
  };
};

interface InventoryDataEnhanced {
  category: string;
  name: string;
  price: string;
  quantity: number;
  value: string;
  isDisabled: boolean;
}
const InventoryTable: React.FC = () => {
  const { state:{inventoryData,isAdmin}, dispatch } = useContext(InventoryContext);
  const [columnHeader, setColumnHeader] = useState<HeadCells[]>(headCells);
  const [editedItemIndex, setEditedItemIndex] = useState<number>(-1);
  const [saveDisabled, setSaveDisabled] = useState<boolean>(false);
  const [editPopoverAnchor, setEditPopoverAnchor] =
    useState<HTMLElement | null>(null);

  const [editedItem, setEditedItem] = useState<InventoryDataEnhanced | null>(
    null
  );

  const handleDisable = (item: InventoryDataEnhanced, index: number) => {
    if (!isAdmin) {
      return;
    }

    const data = [...inventoryData];
    const updatedData = data.map((currentData) => {
      if (currentData.name === item.name) {
        return {
          ...currentData,
          isDisabled: !item.isDisabled,
        };
      }
      return currentData;
    });
    dispatch(setInventoryData(updatedData));
  };
  const handleEdit = (item: InventoryDataEnhanced, index: number) => {
    if (!isAdmin) {
      return;
    }
    if (item.isDisabled) {
      return;
    }
    setEditedItemIndex(index);
    setEditedItem(item);
    setEditPopoverAnchor(document.getElementById(`edit-button-${index}`));
  };

  const handleEditSubmit = () => {
    if (editedItem) {
      const updatedData = inventoryData.map((item) => {
        if (item.name === editedItem.name) {
          return editedItem;
        }
        return item;
      });
      dispatch(setInventoryData(updatedData));
      setEditPopoverAnchor(null);
      setEditedItem(null);
    }
  };

  const handleSaveChanges = () => {
    handleEditSubmit();
    handleClosePopover();
    toast.success("Data updated")
  };

  const handleCancelChanges = () => {
    handleClosePopover();
  };
  const handleClosePopover = () => {
    setEditPopoverAnchor(null);
  };

  const handleDelete = (data: InventoryDataEnhanced, index: number) => {
    if (!isAdmin) {
      return;
    }
    const filterItems = inventoryData.filter((item) => item.name !== data.name);
    dispatch(setInventoryData(filterItems));
  };

  const handleEditInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof InventoryDataEnhanced
  ) => {
    if (editedItem) {
      setEditedItem({ ...editedItem, [field]: event.target.value });
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        className='table-container'
        sx={{ border: "1px solid #30363db3", backgroundColor: "black" }}>
        <Table sx={{ borderCollapse: "collapse" }}>
          <TableHead>
            <TableRow sx={{ border: "1px solid #30363db3 !important" }}>
              {columnHeader.map((header, index) => (
                <TableCell
                  sx={{ color: "var(--text-primary-color)", border: "none" }}
                  key={index}>
                  <span className='table-container-cell'>{header.label}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryData.map((data, index) => (
              <StyledTableRow key={index} style={{opacity:data.isDisabled?'0.4':'1'}}>
                <TableCell
                  sx={{ color: "var(--text-primary-color)", border: "none" }}>
                  {data.name}
                </TableCell>
                <TableCell
                  sx={{ color: "var(--text-primary-color)", border: "none" }}>
                  {data.category}
                </TableCell>
                <TableCell
                  sx={{ color: "var(--text-primary-color)", border: "none" }}>
                  {data.price}
                </TableCell>
                <TableCell
                  sx={{ color: "var(--text-primary-color)", border: "none" }}>
                  {data.quantity}
                </TableCell>
                <TableCell
                  sx={{ color: "var(--text-primary-color)", border: "none" }}>
                  {data.value}
                </TableCell>
                <TableCell
                  sx={{ color: "var(--text-primary-color)", border: "none" }}
                  className='table-container-action'>
                  <div className='table-container-action-items'>
                  <Tooltip title={isAdmin?"edit":'need admin permission to edit'}>
                    <EditIcon
                      id={`edit-button-${index}`}
                      onClick={() => handleEdit(data, index)}
                      className={
                        isAdmin && !data.isDisabled
                          ? "table-container-action-items-edit"
                          : "table-container-action-items-opacity"
                      }
                    />
                    </Tooltip>
                    {data.isDisabled ? (
                      <Tooltip title={isAdmin?"enable":'need admin permission to enable'}>
                      <VisibilityOffIcon
                        onClick={() => handleDisable(data, index)}
                        className={
                          isAdmin
                            ? "table-container-action-items-visible"
                            : "table-container-action-items-opacity"
                        }
                      />
                      </Tooltip>
                    ) : (
                      <Tooltip title={isAdmin?"disable":'need admin permission to disable'}>
                      <VisibilityIcon
                        onClick={() => handleDisable(data, index)}
                        className={
                          isAdmin
                            ? "table-container-action-items-visible"
                            : "table-container-action-items-opacity"
                        }
                      />
                      </Tooltip>
                    )}
                    <Tooltip title={isAdmin?"delete":"need admin permission to delete"}>
                    <DeleteIcon
                      onClick={() => handleDelete(data, index)}
                      className={
                        isAdmin
                          ? "table-container-action-items-delete"
                          : "table-container-action-items-opacity"
                      }
                    />
                    </Tooltip>
                  </div>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Popover
        open={!!editPopoverAnchor}
        anchorEl={editPopoverAnchor}
        onClose={handleClosePopover}
        anchorReference='anchorPosition'
        anchorPosition={calculateCenterPosition()}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        PaperProps={{ sx: { backgroundColor: "#f1e199" } }}>
        <Grid
          container
          direction='column'
          spacing={2}
          style={{ padding: "20px" }}>
          <Grid container item spacing={2}>
            <Grid item xs={6}>
              <TextField
                disabled
                label='Name'
                value={editedItem?.name || ""}
                onChange={(e) => handleEditInputChange(e, "name")}
                fullWidth
                variant='outlined'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Category'
                value={editedItem?.category || ""}
                onChange={(e) => handleEditInputChange(e, "category")}
                fullWidth
                variant='outlined'
              />
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={6}>
              <TextField
                label='Price'
                value={editedItem?.price || ""}
                onChange={(e) => handleEditInputChange(e, "price")}
                fullWidth
                variant='outlined'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Quantity'
                value={editedItem?.quantity || ""}
                onChange={(e) => handleEditInputChange(e, "quantity")}
                fullWidth
                variant='outlined'
              />
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={6}>
              <TextField
                label='Value'
                value={editedItem?.value || ""}
                onChange={(e) => handleEditInputChange(e, "value")}
                fullWidth
                variant='outlined'
              />
            </Grid>
          </Grid>
          <Grid item container justifyContent='flex-end'>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSaveChanges}
              sx={{ backgroundColor: "#848d97" }}
              disabled={saveDisabled}> 
              Save
            </Button>
            <Button
              variant='outlined'
              color='primary'
              onClick={handleCancelChanges}
              style={{ marginLeft: "10px" }}
              sx={{ color: "red" }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Popover>
      <ToastContainer />
    </>
  );
};

export default InventoryTable;
