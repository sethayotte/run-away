<p align="center">
<img height="100" src="https://github.com/sethayotte/run-away/blob/main/src/assets/RunAwayLogo.png">
</p>

## Project live @ https://run-away.app


## Project Overview
<p>
  Run Away was designed and built to offer a quick and simple solution for travel inspiration. As an active user of Google Flights to find great deals, there are times where I have a travel itch and have no idea of where to go.

Once a user enters in their departure point, our algorithm will generate a random date range, a random destination, and a competitive fare. At this time, v1.0 is live and we are still working to allow direct connection to an airline’s site for booking. For now, enjoy the tool for destination ideas!
</p>

## Project Highlights

### *Flexible Ticket UI*
<p>
Design was a large focus of this project. This tool had to be simple to navigate and get straight to the point. With all of the data we’d be pulling from the API response, we ensured that it was packaged neatly into an inviting ticket interface.
  </p>

<img height="400" src="https://sethmitchell.dev/static/media/RunAway_ProjectTiles-01.5cfd934f.png">


### *Random Date Generation*
<p>
One of the most difficult aspects of this project was generating random dates to fall within our desired parameters. Once generated, this information is correctly formatted and passed to the request body for a response.

<img height="400" src="https://sethmitchell.dev/static/media/RunAway_ProjectTiles-02.2a808700.png">
</p>

### *Data Manipulation*
<p>
As a response comes in, all of the data needs to be parsed - and in some cases, validated (inbound & outbound airline / route status). Some additional formatting for dates and Iata code, city and country presentation and then passed to their respective state leaving a skeleton in the UI while all the pieces come together.

<img height="400" src="https://sethmitchell.dev/static/media/RunAway_ProjectTiles-03.bc923bcc.png">
</p>

### *A Working Utility*
<p>
While this was a project designed for react practice, I strive to make products that I would personally use and would like to see go out into the world. v1.0 is currently live at [run-away.app](https://run-away.app). Check it out!

<img height="400" src="https://sethmitchell.dev/static/media/RunAway_ProjectTiles-04.6c1fece9.png">
</p>
