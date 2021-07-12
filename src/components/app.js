import { useEffect, useState } from 'preact/hooks'
import TimeTable from './table/index'
import TableHead from './head/index'
const App = () => {
	const [subject, setSubject] = useState([])
	const [currentPlan, setPlan] = useState('')
	useEffect(() => {
		let attr = window.location.search
		let year = ''
		let fastTrack = false
		if (attr.length != 0) {
			attr = attr.split('?')[1].split('&')
			for (let i of attr) {
				let c = i.split('=')
				if (c[0].toLowerCase() == 'year') {
					year = c[1]
				} else if (c[0].toLowerCase() == 'fasttrack') {
					if (c[1].toLowerCase() == 'true') {
						fastTrack = true
					} else {
						fastTrack = false
					}
				}
			}
			if (year == '') {
				year = '1'
			}
			let plan = 'y' + year
			if (fastTrack) {
				plan += '-fast'
			}
			setPlan(plan)
		} else {
			let plan = window.localStorage.getItem('plan')
			if (plan) {
				setPlan(plan)
			} else {
				setPlan('y1')
			}
		}
	}, [])
	useEffect(() => {
		if (currentPlan.length != 0) {
			const data = currentPlan.split('-')
			fetchData(data[0][1], data[1] ? 'true' : 'false')
			window.localStorage.setItem('plan', currentPlan)
		}
	}, [currentPlan])
	const fetchData = async (year, fasttrack) => {
		const url = `https://timetable.cscms.me/api?year=${year}&fastTrack=${fasttrack}`
		// const url = `/assets/data/${currentPlan}.json`;
		await fetch(url)
			.then(res => {
				return res.json()
			})
			.then(data => {
				setSubject(data)
			})
	}
	const handleChangePlan = p => {
		setPlan(p)
	}
	return (
		<div
			id="app"
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div id="table-container">
				<TableHead currentPlan={currentPlan} onChangePlan={handleChangePlan} />
				<TimeTable subject={subject} />
			</div>
		</div>
	)
}

export default App
