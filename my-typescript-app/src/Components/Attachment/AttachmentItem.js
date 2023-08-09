import { Paper, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import defaultImage from "../../Components/Images/defaultFile.png";

export const AttachmentItem = ({ item, removeSelectedFile }) => {
  return (
    <div className="h-24 w-20" key={item[0].name}>
      <Paper className="relative bg-color-3-300">
        <img className="w-ful h-full" src={defaultImage} alt=""></img>
        <span className="absolute -top-2 right-1 cursor-pointer">
          <HighlightOffIcon
            fontSize="small"
            color="action"
            className="-mb-[4%]"
            onClick={() => removeSelectedFile(item[0])}
          />
        </span>
      </Paper>
      <Typography
        className="w-full overflow-hidden whitespace-nowrap text-ellipsis"
        variant="subtitle1"
      >
        {item[0].name}
      </Typography>
    </div>
  );
};
