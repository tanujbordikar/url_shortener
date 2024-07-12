import ShortUrl from "../models/shorturl.js";

export const shorturl = async (req, res) => {
    try {
        const { link } = req.body;

        if (!link) {
            return res.status(400).json({ message: "Link is required" });
        }

        await ShortUrl.create({ full: link });
        res.status(200).json({ message: "Link successfully created!" });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: "Server error" });
    }
};

export const fetchData = async (req, res) =>{
    try {
        const data = await ShortUrl.find({}).lean();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const singleLink = async (req, res) => {
    try {
        const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl});
        if (!shortUrl) return res.sendStatus(404);
        shortUrl.clicks++;
        await shortUrl.save();
        res.status(200).json({ full: shortUrl.full });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};