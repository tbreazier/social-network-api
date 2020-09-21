const { User, Thought } = require('../models');

const thoughtController = {
    //Get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                  res.json({ message: 'No thought found with this id!' });
                  return;
                }
                res.json(dbThoughtData);
              })
              .catch(err => {
                res.json(err);
              });
    },
    //Get single though by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    //Create new thought (POST)
    createThought({ params, body}, res) {
        console.log(body);
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    {_id: params.id},
                    {$push: {thoughts: _id}},
                    {new: true}
                );
                })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this ID!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });    
    },

    //Update a thought by ID (PUT)
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => {
            res.json(err);
          });
    },
    //Delete a thought by ID

    //Create a reaction to a thought

    //Delete a reaction by ID 
}
