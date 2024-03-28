import React, { useState, useEffect, useContext } from "react";
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
import { setWidgetData } from "../../../context/action";

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
  const { state, dispatch } = useContext(InventoryContext);
  const [columnHeader, setColumnHeader] = useState<HeadCells[]>(headCells);
  const [inventoryData, setInventoryData] = useState<InventoryDataEnhanced[]>(
    []
  );
  const [editedItemIndex, setEditedItemIndex] = useState<number>(-1);

  const [editPopoverAnchor, setEditPopoverAnchor] =
    useState<HTMLElement | null>(null);

  const [editedItem, setEditedItem] = useState<InventoryDataEnhanced | null>(
    null
  );

  useEffect(() => {
    const data = state.inventoryData.map((item) => {
      return {
        ...item,
        isDisabled: false,
      };
    });
    setInventoryData(data);
  }, [state.inventoryData]);

  const handleDisable = (item: InventoryDataEnhanced, index: number) => {
    if (!state.isAdmin) {
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
    setInventoryData(updatedData);

    const currentDisabledItemIndex = inventoryData.findIndex(
      (data) => data.name === item.name
    );
    if (currentDisabledItemIndex !== -1) {
      const currentItem = inventoryData[currentDisabledItemIndex];

      const widgetData = state.widgetData;
      let categoryCount = -1;
      widgetData.categories.forEach((categoryItem) => {
        if (categoryItem === currentItem.category) {
          categoryCount++;
        }
      });
      if (!currentItem.isDisabled) {
        const updatedWidget = {
          ...widgetData,
          totalProduct: widgetData.totalProduct - 1,
          totalStoreValue:
            widgetData.totalStoreValue -
            parseInt(currentItem.value.replace("$", "")),
          outOfStock:
            currentItem.quantity === 0
              ? widgetData.outOfStock - 1
              : widgetData.outOfStock,
          numberOfCategory:
            categoryCount > 1
              ? widgetData.numberOfCategory
              : widgetData.numberOfCategory - 1,
        };
        dispatch(setWidgetData(updatedWidget));
      } else {
        const updatedWidget = {
          ...widgetData,
          totalProduct: widgetData.totalProduct + 1,
          totalStoreValue:
            widgetData.totalStoreValue +
            parseInt(currentItem.value.replace("$", "")),
          outOfStock:
            currentItem.quantity === 0
              ? widgetData.outOfStock + 1
              : widgetData.outOfStock,
          numberOfCategory:
            categoryCount > 1
              ? widgetData.numberOfCategory
              : widgetData.numberOfCategory + 1,
        };
        dispatch(setWidgetData(updatedWidget));
      }
    }
  };
  const handleEdit = (item: InventoryDataEnhanced, index: number) => {
    if (!state.isAdmin) {
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

      const currentWidgetData = state.widgetData;
      let categoryCount = -1;
      currentWidgetData.categories.forEach((item) => {
        if (item === editedItem.category) {
          categoryCount++;
        }
      });
      const currentEditedItem = inventoryData[editedItemIndex];
      const updatedValue =
        parseInt(editedItem.value.replace("$", "")) -
        parseInt(currentEditedItem.value.replace("$", ""));
      const updatedWidget = {
        ...state.widgetData,
        totalProduct: currentWidgetData.totalProduct,
        totalStoreValue: currentWidgetData.totalStoreValue + updatedValue,
        numberOfCategory:
          categoryCount > 0
            ? currentWidgetData.numberOfCategory
            : currentWidgetData.numberOfCategory + 1,
        outOfStock:
          editedItem.quantity === 0
            ? currentWidgetData.outOfStock - 1
            : currentWidgetData.outOfStock,
      };
      dispatch(setWidgetData(updatedWidget));
      setInventoryData(updatedData);
      setEditPopoverAnchor(null);
      setEditedItem(null);
    }
  };

  const handleSaveChanges = () => {
    handleEditSubmit();
    handleClosePopover();
  };

  const handleCancelChanges = () => {
    handleClosePopover();
  };
  const handleClosePopover = () => {
    setEditPopoverAnchor(null);
  };

  const updateWidget = (data: InventoryDataEnhanced) => {
    const currentWidgetData = state.widgetData;
    let categoryCount = -1;
    currentWidgetData.categories.forEach((item) => {
      if (item === data.category) {
        categoryCount++;
      }
    });
    const updatedWidget = {
      ...state.widgetData,
      totalProduct: currentWidgetData.totalProduct - 1,
      totalStoreValue:
        currentWidgetData.totalStoreValue -
        parseInt(data.value.replace("$", "")),
      numberOfCategory:
        categoryCount > 1
          ? currentWidgetData.numberOfCategory
          : currentWidgetData.numberOfCategory - 1,
      outOfStock:
        data.quantity === 0
          ? currentWidgetData.outOfStock - 1
          : currentWidgetData.outOfStock,
    };
    dispatch(setWidgetData(updatedWidget));
  };

  const handleDelete = (data: InventoryDataEnhanced, index: number) => {
    if (!state.isAdmin) {
      return;
    }
    const deleteItem = inventoryData[index];
    if (!data.isDisabled) {
      updateWidget(data);
    }
    const filterItems = inventoryData.filter((item) => item.name !== data.name);
    setInventoryData(filterItems);
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
              <StyledTableRow key={index}>
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
                    <EditIcon
                      id={`edit-button-${index}`}
                      onClick={() => handleEdit(data, index)}
                      className={
                        state.isAdmin && !data.isDisabled
                          ? "table-container-action-items-edit"
                          : ""
                      }
                    />
                    {data.isDisabled ? (
                      <VisibilityOffIcon
                        onClick={() => handleDisable(data, index)}
                        className={
                          state.isAdmin
                            ? "table-container-action-items-visible"
                            : ""
                        }
                      />
                    ) : (
                      <VisibilityIcon
                        onClick={() => handleDisable(data, index)}
                        className={
                          state.isAdmin
                            ? "table-container-action-items-visible"
                            : ""
                        }
                      />
                    )}

                    <DeleteIcon
                      onClick={() => handleDelete(data, index)}
                      className={
                        state.isAdmin
                          ? "table-container-action-items-delete"
                          : ""
                      }
                    />
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
              sx={{ backgroundColor: "#848d97" }}>
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
    </>
  );
};

export default InventoryTable;
