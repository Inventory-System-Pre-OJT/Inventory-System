import Expenditure from '../models/expenditure.model.js';

// Create a new expenditure
/*export const createExpenditure = async (req, res) => {
    const { classExp, subclass } = req.body;

    try {
        const expenditure = new Expenditure({ classExp, subclass });
        await expenditure.save();
        res.status(201).json(expenditure);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
*/

export const createExpenditure = async (req, res) => {
    const { classExp, subclass } = req.body;

    try {
        // Ensure subclass is an array
        if (!Array.isArray(subclass)) {
            return res.status(400).json({ message: 'Subclass must be an array' });
        }

        const expenditure = new Expenditure({ classExp, subclass });
        await expenditure.save();
        res.status(201).json(expenditure);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all expenditures
export const getAllExpenditure = async (req, res) => {
    try {
        const expenditure = await Expenditure.find();
        res.status(200).json(expenditure);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an expenditure by ID
export const getExpenditureById = async (req, res) => {
    try {
        const expenditure = await Expenditure.findById(req.params.id);
        if (expenditure) {
            res.status(200).json(expenditure);
        } else {
            res.status(404).json({ message: 'Expenditure not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an expenditure by ID
export const updateExpenditureById = async (req, res) => {
    try {
        const expenditure = await Expenditure.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (expenditure) {
            res.status(200).json(expenditure);
        } else {
            res.status(404).json({ message: 'Expenditure not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete an expenditure by ID
export const deleteExpenditureById = async (req, res) => {
    try {
        const expenditure = await Expenditure.findByIdAndDelete(req.params.id);
        if (expenditure) {
            res.status(200).json({ message: 'Expenditure deleted' });
        } else {
            res.status(404).json({ message: 'Expenditure not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/*export const getOptions = async (req, res) => {
    try {
      const classExpOptions = await Expenditure.distinct('classExp');
      const subclassOptions = await Expenditure.distinct('subclass');
  
      res.json({
        classExpOptions: classExpOptions.map(value => ({ value, label: value })),
        subclassOptions: subclassOptions.map(value => ({ value, label: value }))
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching options' });
    }
  };

  */

  export const getClassExpOptions = async (req, res) => {
    try {
        const classExpOptions = await Expenditure.distinct('classExp');
        res.json(classExpOptions.map(value => ({ value, label: value })));
    } catch (error) {
        res.status(500).json({ error: 'Error fetching classExp options' });
    }
};

export const getSubclassesByClassExp = async (req, res) => {
    try {
        const { classExp } = req.params;
        // Find all documents matching the classExp and aggregate subclasses
        const expenditures = await Expenditure.find({ classExp }).select('subclass').exec();
        if (expenditures.length > 0) {
            // Aggregate all subclasses from the matched documents
            const subclasses = expenditures.flatMap(exp => exp.subclass);
            const uniqueSubclasses = [...new Set(subclasses)];
            res.json(uniqueSubclasses.map(subclass => ({ value: subclass, label: subclass })));
        } else {
            res.json([]); // No subclasses found for the classExp
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching subclasses' });
    }
};
