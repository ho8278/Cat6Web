// //import React, { Component } from 'react';
// import Calendar from 'react-calendar';
// import React, { useState, useEffect } from 'react';
// import 'sass/app.css';
// import ControlView from 'js/containers/controlView/ControlView';
// import CalendarView from 'js/containers/calendarView/CalendarView';
// import AddForm from 'js/containers/components/AddForm';
// import ErrorPopup from 'js/containers/components/ErrorPopup';
// import { useUserData } from 'js/stores/userData';

// // class Home extends Component {
// //     state = {
// //         date: new Date()
// //     }

// //     onChange = date => this.setState({date})

// //     render(){
// //         return(
// //           <div>
// //               <h2>Home</h2>
// //               <Calendar 
// //                 onChange={this.onChange} 
// //                 value={this.state.date} 
// //               />
// //           </div>
// //         );
// //     }
// // };

// const Home = () => {
	
//   const [ userData, setUserData ] = useUserData();

// 	useEffect(() => {
// 		loadUserData();
// 	}, []);

// 	useEffect(
// 		() => {
// 			saveUserData();
// 		},
// 		[ userData ]
// 	);

// 	const saveUserData = () => {
// 		const data = JSON.stringify(userData);
// 		localStorage.setItem('userData', data);
// 	};

// 	const loadUserData = () => {
// 		const data = JSON.parse(localStorage.getItem('userData'));
// 		if (!data) return;
// 		setUserData({
// 			...userData,
// 			schedule: data.schedule.map((a) => {
// 				return { ...a, curDate: new Date(a.curDate) };
// 			})
// 		});
// 	};

// 	return (
// 		<div id="app">
// 			<ControlView />
// 			<CalendarView />
// 			<AddForm />
// 			<ErrorPopup />
// 		</div>
// 	);
// };

// export default Home;


import React from 'react';
import 'sass/app.css';
import { Calendar, CalendarControls } from 'react-yearly-calendar'
import './Home.css';
import moment from 'moment';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';


import { throws } from 'assert';
import { runInThisContext } from 'vm';

const viewStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
   }
};
const createStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '40%',
      height: '55%',
      textAlign: 'center'
   }
};

let customCSSclasses = {
   holidays: [],
   spring: {
     start: '2019-01-01',
     end: '2019-03-31'
   },
   summer: {
     start: '2019-04-01',
     end: '2019-06-30'
   },
   autumn: {
     start: '2019-07-01',
     end: '2019-09-30'
   },
   winter: {
      start: '2019-10-01',
      end: '2020-12-31'
   },
   weekend: 'Sat,Sun'
  }

class Home extends React.Component {

   constructor() {
      super(...arguments)
      this.state = {
         teamID: '',
         //'ab7e45790d844b5e8c8d498907aee318'
         curYear: '',
         today: '',
         schedule: [],
         selectedDate: '',
         flag: false,
         dateList: [],

         viewModalOpen: false,
         createModalOpen: false,

         startDate: new Date(),
         startTime: '10:00',
         endTime: '10:00',
         contents: "",

         //그룹 
         teams: []
      }

      this.getPickedDate = this.getPickedDate.bind(this)
      this.setCurrYearPlus = this.setCurrYearPlus.bind(this)
      this.setCurrYearMinus = this.setCurrYearMinus.bind(this)
      this.goToday = this.goToday.bind(this)
      this.insertSchedule = this.insertSchedule.bind(this)

      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeViewModal = this.closeViewModal.bind(this);
      this.closeCreateModal = this.closeCreateModal.bind(this);

      this.dateChange = this.dateChange.bind(this);
      this.startTimeChange = this.startTimeChange.bind(this);
      this.endTimeChange = this.endTimeChange.bind(this);
      this.contentsChange = this.contentsChange.bind(this);
   }

   componentDidMount() {
      const curr = new Date()
      curr.setTime(Date.now())
      this.setState({
         curYear: curr.getFullYear(),
         today: curr,
         selectedDate: curr,
      })

      fetch("http://180.71.228.163:8080/viewSchedules?team_ID=" + this.state.teamID)
         .then(res => res.json())
         .then(
            (res) => {
               if (res.result == 200) {
                  res.data.sort(this.sortRule)

                  this.setState({
                     schedule: res.data,
                     flag: true
                  });
               }
            }
         )

       //해당 id가 속한 그룹 조회
       const id = window.sessionStorage.getItem('id');

       fetch("http://180.71.228.163:8080/viewTeams/n?client_ID="+id)
          .then(res => res.json())
          .then(
             (res) => {           
                this.setState({
                   teams: res.data
                })
             },
             (error) => {                    
                alert(error);
             }
          )
   }

   getPickedDate(date) {

      this.setState({
         viewModalOpen: true,
         selectedDate: date.toDate(),
         startDate: date.toDate()
      })
   }

   setCurrYearPlus() {
      const cur = this.state.curYear

      this.setState({
         curYear: cur + 1
      })
   }

   setCurrYearMinus() {
      const cur = this.state.curYear

      this.setState({
         curYear: cur - 1
      })
   }

   goToday() {
      const curr = this.state.today

      this.setState({
         curYear: curr.getFullYear(),
         selectedDate: curr
      })
   }

   insertSchedule() {
      console.log(this.state.startDate)
      let strDate = moment(this.state.startDate).format('YYYY-MM-DD HH:MM:SS')
      
      let schedule_start_date = this.getFullyear(strDate) + "-" + 
      this.getMonth(strDate) + "-" + 
      this.getDate(strDate) + " " + this.state.startTime
      
      let schedule_end_date = this.getFullyear(strDate) + "-" + 
      this.getMonth(strDate) + "-" + 
      this.getDate(strDate) + " " + this.state.endTime

      let schedule_contents = this.state.contents
      let schedule_team_ID = this.state.teamID

      fetch("http://180.71.228.163:8080/setSchedule?schedule_start_date=" + schedule_start_date
          + "&schedule_end_date=" + schedule_end_date
          + "&schedule_contents=" + schedule_contents
          + "&schedule_team_ID=" + schedule_team_ID,
      {
         method: "POST"
      })
      .then(res => res.text())
      .then(
         (res) => {
            this.setState({
               createModalOpen: false,
               viewModalOpen: true,
               contents: ''
            })
            this.updateSchedule()
         }
      )
   }


   getFullyear(strDate) {
      return strDate.substr(0, 4)
   }
   getMonth(strDate) {
      return strDate.substr(5, 2)
   }
   getDate(strDate) {
      return strDate.substr(8, 2)
   }
   getHours(strDate) {
      return strDate.substr(11, 2)
   }
   getMinute(strDate) {
      return strDate.substr(14, 2)
   }
   getSecond(strDate) {
      return strDate.substr(18, 2)
   }

   sortRule(a, b) {
      const a_hours = parseInt(a.schedule_start_date.substr(11, 2))
      const b_hours = parseInt(b.schedule_start_date.substr(11, 2))

      if (a_hours < b_hours) {
         return -1
      } else {
         return 1
      }
   }

   updateSchedule() {

      this.setState({
         schedule: [],
         flag: false
      });

      fetch("http://180.71.228.163:8080/viewSchedules?team_ID=" + this.state.teamID)
         .then(res => res.json())
         .then(
            (res) => {
               if (res.result == 200) {
                  res.data.sort(this.sortRule)

                  this.setState({
                     schedule: res.data,
                     flag: true
                  });
               }
            }
         )

      this.forceUpdate()


   }

   openModal() {
      this.setState({ createModalOpen: true, viewModalOpen: false });
   }

   afterOpenModal() {
      // references are now sync'd and can be accessed.
      this.subtitle.style.color = '#f00';
   }

   closeViewModal() {
      this.setState({ viewModalOpen: false });
   }
   closeCreateModal() {
      this.setState({ createModalOpen: false});
   }

   dateChange(date) {
      this.setState({
         startDate: date
      });
   }

   startTimeChange(t) {
      this.setState({
         startTime: t
      });
   }
   endTimeChange(t) {
      this.setState({
         endTime: t
      });
   }

   contentsChange(c) {
      this.setState({
         contents: c.target.value
      });
   }

   setSelectedID(id){
      this.setState({
         teamID: id
      })
   }

   render() {
      let t_list = this.state.teams

      return (
         <div id="app">
            {/* 그룹 선택 */}
            <div className="select_group">
               {t_list.map((name) => {
                  return <button onClick={(e) => this.setSelectedID(name.team_ID, e)}>
                     {name.team_name}
                  </button>
               })}
               <hr />
            </div>
            <CalendarControls
               year={parseInt(this.state.curYear)}
               showTodayButton={true}
               onPrevYear={this.setCurrYearMinus}
               onNextYear={this.setCurrYearPlus}
               goToToday={this.goToday}
            />
            <Calendar
               year={parseInt(this.state.curYear)}
               selectedDay={moment(this.state.selectedDate)}
               onPickDate={this.getPickedDate}
            />
            <br />
            <hr height='3px' width='100%' />
            <br />
            <div width='100%'>
               <Modal
                  isOpen={this.state.viewModalOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeViewModal}
                  style={viewStyles}
               >

                  <h2 ref={subtitle => this.subtitle = subtitle}>일정</h2>
                  {this.state.schedule.map((obj, i) => {

                     if (this.state.selectedDate.getFullYear() === parseInt(this.getFullyear(obj.schedule_start_date))
                        && parseInt(this.state.selectedDate.getMonth() + 1) === parseInt(this.getMonth(obj.schedule_start_date))
                        && parseInt(this.state.selectedDate.getDate()) === parseInt(this.getDate(obj.schedule_start_date))) {

                        return (
                           <SchduleInfo
                              onDelete={this.updateSchedule.bind(this)}
                              schedule_team_ID={obj.schedule_team_ID}
                              schedule_ID={obj.schedule_ID}
                              schedule_start_date={obj.schedule_start_date}
                              schedule_end_date={obj.schedule_end_date}
                              schedule_contents={obj.schedule_contents}
                           />)
                     }
                  })}
                  <button className="my_btn" onClick={this.openModal}>일정 추가</button>
               </Modal>
               <Modal
                  isOpen={this.state.createModalOpen}
                  onRequestClose={this.closeCreateModal}
                  style={createStyles}
               >

                  <h2 ref={subtitle => this.subtitle = subtitle}>일정 추가</h2>

                  <div>
                     <DatePicker
                        selected={this.state.startDate}
                        onChange={this.dateChange}
                     />
                     <div>
                     <TimePicker
                        className="time_pic"
                        name='startTime'
                        value={this.state.startTime}
                        onChange={this.startTimeChange}
                        clockIcon={null}
                     />
                     ~
                     <TimePicker
                        className="time_pic"
                        name='endTime'
                        value={this.state.endTime}
                        onChange={this.endTimeChange}
                        clockIcon={null}
                     />
                     </div>
                  </div>
                  <div>
                  <input 
                     type='text'
                     value={this.state.contents}
                     onChange={this.contentsChange}
                     placeholder='할 일'
                  />

                  </div>
                  <div>
                     <button className="my_btn" onClick={this.insertSchedule}>추가</button>
                  </div>
               </Modal>
            </div>
            <br />
            </div >)
   }
};

class SchduleInfo extends React.Component {

   constructor() {
      super(...arguments);
      this.state = {
         schedule_team_ID: this.props.schedule_team_ID,
         schedule_ID: this.props.schedule_ID,
         schedule_start_date: this.props.schedule_start_date,
         schedule_end_date: this.props.schedule_end_date,
         schedule_contents: this.props.schedule_contents
      }

      this.deleteSchedule = this.deleteSchedule.bind(this)
   }

   deleteSchedule() {
      fetch("http://180.71.228.163:8080/deleteSchedule?schedule_ID=" + this.state.schedule_ID,
         {
            method: "DELETE"
         })
         .then(res => res.json())
         .then(
            (res) => {
               if (res == 200) {
                  this.props.onDelete()
               }
            }
         )

   }

   getFullyear(strDate) {
      return strDate.substr(0, 4)
   }
   getMonth(strDate) {
      return strDate.substr(5, 2)
   }
   getDate(strDate) {
      return strDate.substr(8, 2)
   }
   getHours(strDate) {
      return strDate.substr(11, 2)
   }
   getMinute(strDate) {
      return strDate.substr(14, 2)
   }
   getSecond(strDate) {
      return strDate.substr(18, 2)
   }

   render() {
      return (
         <div>
            <ul>
               <li>
                  {this.getFullyear(this.state.schedule_start_date)}-{this.getMonth(this.state.schedule_start_date)}-{this.getDate(this.state.schedule_start_date)} &nbsp;
                  {this.getHours(this.state.schedule_start_date) + ":" + this.getMinute(this.state.schedule_start_date)}
                  ~ {this.getHours(this.state.schedule_end_date) + ":" + this.getMinute(this.state.schedule_end_date)}
                  &nbsp;&nbsp; {this.state.schedule_contents} &nbsp;&nbsp; <button className="my_btn_del" onClick={this.deleteSchedule}>삭제</button>
               </li>
            </ul>
         </div>
      )
   }
}

export default Home;