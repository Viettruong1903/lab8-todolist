'use server'
import {revalidatePath} from 'next/cache'

import {ref, update} from 'firebase/database'

import {db} from '@/lib/firebase/firebaseInit'
// formData  = formData object name/value pairs from the form
export async function editAction(prevState, formData) {
	const task = formData.get('task')
	const category = formData.get('category')
	const uid = formData.get('uid')
	console.log(uid, task, category)
	// call edit task

	const newObj = {
		task,
		category,
	}

	const response = await editTask(newObj, uid)
	revalidatePath('/demo')
	return {message: response}
}

// Firebase NoSql SQL ....
async function editTask(task, uid) {
	const path = `todosDB/${uid}`
	const dbRef = ref(db, path)


	try {
		await update(dbRef, task)
		return 'success'
	} catch (error) {
		return 'failure'
		console.log('error')
	}
}
