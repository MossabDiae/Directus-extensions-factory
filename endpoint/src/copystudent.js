
export default (router, { services, getSchema, env }) => {
	const { ItemsService } = services
	const {HOST, PORT} = env

	// The route gets called from the registration so it accepts the regitration id (pk)
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
				// Create student
				const new_student = await stud_service.createOne(student_data)

				// Then delete registration entry
				await reg_service.deleteOne(req.params.pk);

				//  Redirect to newly created student
				res.redirect(`http://${HOST}:${PORT}/admin/content/students/${new_student}`)

			} else {
				res.send("Please specify the program in registration")
			}

		} catch (err) {
			console.log("A bad err has happened");
			res.send("an error has happened")
		}

	})
};
