import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import {
  Avatar,
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 650,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function HomeLayout() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [personName, setPersonName] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewcomment] = useState("");
  const [date, setDate] = useState([]);
  console.log("@SN date", date);
  useEffect(() => {
    fetch("https://mocki.io/v1/b0c7d7ea-5d09-4b9c-8d4b-c1b40cc39bc9")
      .then((data) => data.json())
      .then((res) => setComments(res.comments));
  }, []);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleClick = () => {
    let data = new Date();
    let day = data.getDate();
    let month = data.toLocaleString("en-US", { month: "short" });
    let year = data.getFullYear();
    let h = data.getHours() % 12 || 12;
    let m = data.getMinutes();

    setDate((prevState) => {
      return [
        ...prevState,
        [day + " " + month + ", " + year + ", " + h + ":" + m],
      ];
    });

    setComments((prevState) => {
      return [
        ...prevState,
        {
          updatedBy: "Suyog Nagawade",
          comment: newComment,
          taggedTo: personName,
          updatedOn: date,
        },
      ];
    });
    setNewcomment("");
  };
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ padding: 0, margin: 0 }}>
              Comments - {comments.length}
            </span>
            <span>Loan ID - 112245</span>
          </div>
          {comments.map((item, index) => {
            return (
              <>
                <List
                  key={index}
                  style={{ padding: 0, width: "600px" }}
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem
                    alignItems="flex-start"
                    style={{ padding: 0, width: "600px" }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={item.updatedBy}
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.updatedBy}
                      secondary={
                        <>
                          {item.comment}
                          {item.taggedTo && (
                            <>
                              <br /> <span>{item.taggedTo}</span> <br />
                            </>
                          )}
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.updatedOn}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              </>
            );
          })}

          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <ListItemAvatar>
                <Avatar alt="Suyog" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <textarea
                value={newComment}
                id="w3review"
                name="w3review"
                rows="4"
                cols="50"
                style={{ resize: "none" }}
                onChange={(e) => setNewcomment(e.target.value)}
              >
                hello
              </textarea>
            </Box>
          </Box>
          <Stack direction="row" spacing={2} style={{ paddingLeft: "65px" }}>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Stack>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}

export default HomeLayout;
