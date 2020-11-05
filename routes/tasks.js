const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { csrfProtection, asyncHandler } = require("./utils");
const cors = require("cors");
// const { requireAuth } = require('../auth');
const db = require("../db/models");

const { Task, User } = db;
// router.use(requireAuth);

/****************** VALIDATION AND ERROR CHECKS **************************/

const validateTask = [
<<<<<<< HEAD

    check("title")
        .exists(({ checkFalsy: true}))
        .withMessage('Must provide a title.'),

    check('estimate')
        .exists({checkFalsy: true})
        .withMessage('Estimate cannot be null')
        .isLength({min: 0})

    //TODO: VALIDATE LIST ID IF IT EXISTS
]

const validateEditTask = [
    check("title")
        .exists(({ checkFalsy: true}))
        .withMessage('Must provide a title.'),

    check('estimate')
        .exists({checkFalsy: true})
        .withMessage('Estimate cannot be null')
        .isLength({min: 0})
]
=======
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Must provide a title."),

  check("estimate")
    .exists({ checkFalsy: true })
    .withMessage("Estimate cannot be null")
    .isLength({ min: 0 }),

  //TODO: VALIDATE LIST ID IF IT EXISTS
];

const validateEditTask = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Must provide a title."),

  check("estimate")
    .exists({ checkFalsy: true })
    .withMessage("Estimate cannot be null")
    .isLength({ min: 0 }),
];
>>>>>>> master

const taskNotFoundError = (id) => {
  const error = new Error(`Task with id of ${id} not found`);
  error.title = "Task not found";
  error.status = 404;
  return error;
};

const notAuthorizedError = (taskId) => {
  const error = new Error(
    `User does not have authorization to interact with task ${taskId}`
  );
  error.title = "User Not Authorized";
  error.status = 401;
  return error;
};

/***********************      ROUTES     *****************************/

router.get(
  "/",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const userId = req.session.auth.userId;
    let allTasks = await Task.findAll({
<<<<<<< HEAD
        include: [{ model: User, as: "user", attributes:["email"]}],
        order: [["createdAt", "DESC"]],
        attributes: ["title", "id", "estimate"],
        where: {
            "createdBy": userId
        }
=======
      include: [{ model: User, as: "user", attributes: ["email"] }],
      order: [["createdAt", "DESC"]],
      attributes: ["title"],
      where: {
        createdBy: userId,
      },
>>>>>>> master
    });
    console.log("hit5");
    res.json({ allTasks });
    // console.log(allTasks)

    // res.render('dummy-all-tasks', {
    //     title: 'Dummy',
    //     allTasks,
    //     csrfToken: req.csrfToken()
    // })
  })
);

// router.get('/:id(\\d+)', asyncHandler( async (req, res, next) => {
//     const taskId = parseInt(req.params.id, 10);
//     const task = await Task.findByPk(taskId);

//     if (task) {
//       res.json({task})
//     } else {
//         next(taskNotFoundError(taskId))
//     }
//   }))

router.post(
  "/",
  csrfProtection,
  validateTask,
  asyncHandler(async (req, res, next) => {
    //TODO add user ID
    const userId = req.session.auth.userId;

<<<<<<< HEAD
    console.log("/n/n/n/Post request went through/n/n")

    const {title, listId, estimate, dueDate} = req.body;
    const task = await Task.build(
        {createdBy: userId,
         title,
         listId,
         estimate,
         dueDate,
          });
=======
    console.log("/n/n/n/Post request went through/n/n");

    const { title, listId, estimate, dueDate } = req.body;
    const task = await Task.build({
      createdBy: userId,
      title,
      listId,
      estimate,
      dueDate,
    });
>>>>>>> master

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await task.save();

      res.status(201).json({ task });
      //TODO implement AJAX here.
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      console.error(errors);
      next(errors);
      //TODO implement AJAX here.
    }
  })
);

router.post(
  "/:id(\\d+)",
  csrfProtection,
  validateEditTask,
  asyncHandler(async (req, res, next) => {
    console.log("-------------------------------");
    const taskId = parseInt(req.params.id, 10);
    const task = await Task.findByPk(taskId);
    const userId = req.session.auth.userId;

    if (task) {
      // CHECKS TO SEE IF USER HAS ACCESS TO THAT TASK

<<<<<<< HEAD
        // CHECKS TO SEE IF USER HAS ACCESS TO THAT TASK

=======
      if (task.createdBy !== userId) {
        next(notAuthorizedError(taskId));
      }
>>>>>>> master

      //CHECKS FOR ERRORS AND UPDATES

      const validatorErrors = validationResult(req);
      if (validatorErrors.isEmpty()) {
        const { title, estimate, listId, dueDate } = req.body;
        await task.update({ title, estimate, listId, dueDate });
        // task.title = title;
        // task.estimate = estimate;
        // task.dueDate = dueDate
        // if (listId) {
        //     task.listId = listId
        // }
        res.status(201).json({ task });
        //TODO Implement AJAX
<<<<<<< HEAD

        } else {
            const errors = validatorErrors.array().map((error) => error.msg);
            console.error(errors);
        }
=======
      } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        console.error(errors);
      }
>>>>>>> master
    } else {
      next(taskNotFoundError(taskId));
    }
<<<<<<< HEAD

}));
=======
  })
);
>>>>>>> master

router.post(
  "/delete/:id(\\d+)",
  validateTask,
  asyncHandler(async (req, res, next) => {
    const taskId = parseInt(req.params.id, 10);
    const task = await Task.findByPk(taskId);
    const userId = req.session.auth.userId;

    if (task.createdBy !== userId) {
      next(taskNotFoundError(taskId));
    }

    if (task) {
      await task.destroy();
      //TODO implement AJAX
      res.status(204).end();
    } else {
      next(notAuthorizedError(taskId));
    }
<<<<<<< HEAD

}));


router.get('/dummy-submit', csrfProtection, asyncHandler(async(req,res,next) => {
    res.render('dummy-submit', {csrfToken: req.csrfToken()})
}))


module.exports = router
=======
  })
);

router.get(
  "/dummy-submit",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    res.render("dummy-submit", { csrfToken: req.csrfToken() });
  })
);

module.exports = router;
>>>>>>> master
