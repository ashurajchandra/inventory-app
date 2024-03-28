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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import { HeadCells, headCells, InventoryData } from "../../utils/data-utils";
import { width } from "@mui/system";
import "./InventoryTable.scss";
import { getInventoryData } from "../../services/apis";
import { InventoryContext } from "../../../context/context";

const StyledTableRow = styled(TableRow)({
  "&:last-child td": {
    borderBottom: "none",
  },
  borderBottom: "1px solid #30363db3",
});

const RedHeaderTableCell = styled(TableCell)({
  backgroundColor: "red",
  color: "yellow",
});
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
  const [disabledRow, setDisabledRow] = useState<boolean>(false);
  const [inventoryData, setInventoryData] = useState<InventoryDataEnhanced[]>(
    []
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
      if (currentData.name == item.name) {
        return {
          ...currentData,
          isDisabled: !item.isDisabled,
        };
      }
      return currentData;
    });
    setInventoryData(updatedData);
  };
  const handleEdit = (item: InventoryDataEnhanced, index: number) => {
    if (!state.isAdmin) {
      return;
    }
    if (item.isDisabled) {
      return;
    }
  };
  const handleDelete = (data: InventoryDataEnhanced, index: number) => {
    if (!state.isAdmin) {
      return;
    }
    const deleteItem = inventoryData[index];
    const filterItems = inventoryData.filter((item) => item.name != data.name);
    setInventoryData(filterItems);
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
    </>
  );
};

export default InventoryTable;
