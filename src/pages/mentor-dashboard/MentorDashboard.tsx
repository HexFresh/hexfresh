import React, {useEffect, useState} from 'react';
import 'react-circular-progressbar/dist/styles.css';
import './mentor-dashboard.css';
import Sidebar from "../../components/side-bar/Sidebar";
import {getStatistic} from "../../api/mentor/mentorApi";
import {CircularProgress, Grid} from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import GroupIcon from '@mui/icons-material/Group';
import StatusCard from "../../components/status-card/StatusCard";
import {useNavigate} from "react-router-dom";
import DonutChart from "../../components/donut-chart/DonutChart";

interface IStat {
  totalFreshers: number;
  newFreshersLast30Days: number;
  newFreshersLast24Hours: number;
  freshersInProgramRatio: IFresherInProgramRatio[];
}

interface IFresherInProgramRatio {
  title: string;
  total: number;
}

export default function MentorDashboard() {
  const [stat, setStat] = useState<IStat | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  const cardData = [{
    id: 1, name: 'New Freshers last 24h', number: stat?.newFreshersLast24Hours, icon: <BarChartIcon/>,
  }, {
    id: 2, name: 'New Freshers last 30 days', number: stat?.newFreshersLast30Days, icon: <PieChartIcon/>,
  }, {
    id: 3, name: 'Total Freshers', number: stat?.totalFreshers, icon: <GroupIcon/>,
  },];

  const options = {
    title: "Number of freshers of each program", pieHole: 0.8, is3D: false, pieSliceText: "none", pieStartAngle: 100
  };

  const fetchStat = async () => {
    const res = await getStatistic();
    console.log(res);
    setStat(res);
  }

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchStat()]);
      setLoading(false);
    }
    fetchData()
  }, []);

  const donutData = (stat: any) => {
    if (stat) {
      const result = [["Program", "Fresher Count"]];
      stat.freshersInProgramRatio.forEach((item: IFresherInProgramRatio) => {
        // @ts-ignore
        result.push([item.title, item.total]);
      })

      console.log(result);
      return result;
    }
  }

  return (
    <div className="mentor-dashboard">
      <div className="container">
        <Sidebar/>
        <div className="page-content">
          <div className="topbar">
            <img src="/logo.svg" width="30px" alt="logo"/>
            <p>Hexfresh</p>
          </div>
          <div className="name-page">
            <div className="container">Dashboard</div>
          </div>
          <div className={"dashboard"}>
            {
              loading ? (<CircularProgress className={"circular-progress"}/>) : (
                <div className={"dashboard-container"}>
                  <div className="cards">
                    <Grid container spacing={2} alignItems="stretch">
                      {cardData.map((card) => {
                        return (<Grid key={card.id} item xs={12} sm={6} lg={4}>
                          <StatusCard card={card}></StatusCard>
                        </Grid>);
                      })}
                    </Grid>
                  </div>
                  <div className="chart" onClick={() => navigate('/programs')}>
                    <DonutChart options={options} data={donutData(stat)}/>
                  </div>
                </div>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}
