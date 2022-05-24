// for testing purpose you can set the request to get, and create the user based on this json
// other than that set service.createOne(req.body)

// const new_student = {
// 	name: "bibou"
// }

// You can access these 

export default (router, { services, getSchema, env }) => {
	const { ItemsService } = services
	const {HOST, PORT} = env

	// The route gets called from the registration so it accepts the regitration id
	router.get('/:pk', async (req, res, next) => {

		// initiating services
		// Registration (used to get registred user and delete it later)
		const reg_service = new ItemsService("registrations", {
			accountability: req.accountability,
			schema: req.schema,
		})

		// Students (used to create the student using data retrieved from registration)
		const stud_service = new ItemsService("students", {
				accountability: req.accountability,
				schema: req.schema,
			})

		// This function gets an element from a service
		// needs: request (it gets id from it too), which collection
		// const get_user = async (req, service) => {		
		// 	const user = await service.readOne(req.params.pk, req.sanitizedQuery)
		// 		.catch(() => {
		// 			console.log("A bad err has happened");
		// 		})
		// 	if (user) {
		// 		return user
		// 	} else {
		// 		return false
		// 	}

		// }

		// This function creates an element
		// needs: request, which collection , data
		// const create_user = async (req, collection, data) => {
		// 	const result = await service.createOne(data)
		// 	return result

		// }


		try {
			// Get user 
			const regs_user = await reg_service.readOne(req.params.pk, req.sanitizedQuery)

			const student_data = {
				name: regs_user.name,
				birthday: regs_user.birthday,
				contact: regs_user.contact,
				program: regs_user.program,
			}

			if (student_data.program) {
				const new_student = await stud_service.createOne(student_data)
				res.redirect(`http://${HOST}:${PORT}/admin/content/students/${new_student}`)
			} else {
				res.send("Please specify the program in registration")
			}

			// Create student
			
			// if (new_student) {
			// 	res.redirect(`http://${HOST}:${PORT}/admin/content/students/${new_student}`)
			// } else {
			// 	res.send("User not found or Program not specified")
			// }

		} catch (err) {
			console.log("A bad err has happened");
			res.send("an error has happened")
		}
		// const regs_user = await get_user(req, "registrations")


		// console.log("############################################################");
		// console.log(regs_user);
		// if (regs_user && regs_user.program) {
		// 	const student_data = {
		// 		name: regs_user.name,
		// 		birthday: regs_user.birthday,
		// 		contact: regs_user.contact,
		// 		program: regs_user.program,
		// 	}
		// 	console.log(student_data);
		// 	const new_student = await create_user(req, "students", student_data);

	})
};
