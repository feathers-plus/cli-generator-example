//!code: imports //!end
//!code: init //!end

let moduleExports = Object.assign({},
  {
    uuid: {
      type: mongoose.Schema.ObjectId
    },
    authorUuid: {
      type: mongoose.Schema.ObjectId
    },
    postUuid: {
      type: mongoose.Schema.ObjectId
    },
    body: {
      type: String
    },
    archived: {
      type: Number
    }
  },
  //!code: moduleExports //!end
);

//!code: exports //!end
module.exports = moduleExports;

//!code: funcs //!end
//!code: end //!end