const selfProfile = async (req) => {
    try {
        return Promise.resolve({ statusCode: 200, status: true, data: "connected", msg: ["connected"] });
    } catch (err) {
        return Promise.reject({ statusCode: 500, status: false, data: {}, msg: ["message"], err: "Error" });

    }
}

module.exports = {
    selfProfile
}