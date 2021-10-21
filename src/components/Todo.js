import React, { useState } from "react";
import {
  Checkbox,
  ListItem,
  ListItemText,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import { Delete, Edit, Save } from "@mui/icons-material";

import styles from "../styles/todo.module.scss";

import { useDispatch, useSelector } from "react-redux";

export default function Todo({ todo }) {
  const { id, title, completed } = todo;

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);

  const todos = useSelector((store) => store.todos);
  const dispatch = useDispatch();

  return (
    <ListItem className={styles.todo} sx={{ boxShadow: 2 }}>
      <Checkbox
        checked={completed}
        onChange={() =>
          dispatch({
            type: "UPDATE_TODO",
            payload: {
              index: todos.indexOf(todo),
              todo: { ...todo, completed: !todo.completed },
            },
          })
        }
      />{" "}
      <ListItemText>
        {editing ? (
          <>
            <Input
              onChange={(e) => setValue(e.target.value)}
              value={value}
              sx={{ color: "lemonchiffon" }}
            />
            <IconButton
              onClick={() => {
                dispatch({
                  type: "UPDATE_TODO",
                  payload: {
                    index: todos.indexOf(todo),
                    todo: { ...todo, title: value },
                  },
                });
                setEditing(false);
              }}>
              <Save />
            </IconButton>
          </>
        ) : (
          <Typography className={completed && styles.completed}>
            {id} {title}
          </Typography>
        )}
      </ListItemText>
      <IconButton
        onClick={() => dispatch({ type: "REMOVE_TODO", payload: todo })}>
        <Delete />
      </IconButton>
      <IconButton onClick={() => setEditing(true)}>
        <Edit />
      </IconButton>
    </ListItem>
  );
}
