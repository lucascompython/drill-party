import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

export default class MusicPlayer extends Component {


  constructor(props) {
    super(props);
    this.state = {
      Name: "Not Currently Playing a Song...",
      Disco: "https://cdn.discordapp.com/attachments/626449728988774401/846823394586787890/disco.png",
  };
  };

  previousSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/previous", requestOptions); console.log("Previous");
  }


  skipSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions); console.log("Skiped"); 
  }

  pauseSong(){
    const requestOptions = {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
    };
    fetch("/spotify/pause", requestOptions); console.log("Paused")
  }

  playSong(){
    const requestOptions = {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
    };
    fetch("/spotify/play", requestOptions); console.log("Playing")
  }


  render() {
    const songProgress = (this.props.time / this.props.duration) * 100;
    const cem = 100;
    return (
      <Card>
        <Grid container alignItems="center">
          <Grid item align="center" xs={4}>
            {!this.props.is_playing ? <img src={this.state.Disco} height="100%" width="100%" /> : <img src={this.props.image_url} height="100%" width="100%" />} 
            
          </Grid>
          <Grid item align="center" xs={8}>
            <Typography component="h5" variant="h5">
              {!this.props.is_playing ? this.state.Name : this.props.title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {!this.props.is_playing ? "" : this.props.artist}
            </Typography>
            <div>
            {this.props.votes} / {this.props.votes_required}
            <IconButton onClick={() => this.previousSong()}>
            <SkipPreviousIcon /> 
            </IconButton>
              <IconButton
                onClick={() => {
                  this.props.is_playing ? this.pauseSong() : this.playSong();
                }}  
              >
                {this.props.is_playing ? <PauseIcon  /> : <PlayArrowIcon  />}
              </IconButton>
              <IconButton onClick={() => this.skipSong()}>
                <SkipNextIcon /> 
              </IconButton>
              {this.props.votes} / {this.props.votes_required}
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={!this.props.is_playing ? cem : songProgress} />
      </Card>
    );
  }
}