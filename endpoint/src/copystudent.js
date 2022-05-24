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

		// This function gets an element from a collection 
		// needs: request (it gets id from it too), which collection
		const get_user = async (req, collection) => {
			const service = new ItemsService(collection, {
				accountability: req.accountability,
				schema: req.schema,
			})
			
			const user = await service.readOne(req.params.pk, req.sanitizedQuery)
				.catch(() => {
					console.log("A bad err has happened");
				})
			if (user) {
				return user
			} else {
				return false
			}

		}

		// This function creates an element
		// needs: request, which collection , data
		const create_user = async (req, collection, data) => {
			const service = new ItemsService(collection, {
				accountability: req.accountability,
				schema: req.schema,
			})

			const result = await service.createOne(data)
			return result

		}


		// get user 
		const regs_user = await get_user(req, "registrations")
			// .catch((err) => {
			// 	console.log(err);
			// res.send("sorry an err happened")
			// 	next(err)
			// 	// return
				
			// })

		console.log("############################################################");
		console.log(regs_user);
		if (regs_user && regs_user.program) {
			const student_data = {
				name: regs_user.name,
				birthday: regs_user.birthday,
				contact: regs_user.contact,
				program: regs_user.program,
			}
			console.log(student_data);
			const new_student = await create_user(req, "students", student_data);
			if (new_student) {
				res.redirect(`http://${HOST}:${PORT}/admin/content/students/${new_student}`)
			}
		} else {
				res.send("User not found or Program not specified")
		}

	})
};
