module.exports = (sequelize, DataTypes) => {
    return sequelize.define('trainer', {
        username: DataTypes.STRING,

        price: {
            type: DataTypes.INTEGER,
            defaultValue: "10000"
        },

        career: DataTypes.TEXT,

        description: DataTypes.TEXT,

        summary: DataTypes.STRING(2000),

        picture_url: {
            type: DataTypes.TEXT,
            isUrl: true,
        },

        phone_number: {
            type: DataTypes.STRING(12),
            //pattern 형식에 맞게 like 정규표현식?
        },

        total_star: DataTypes.INTEGER,

        num_review: DataTypes.INTEGER,

        access_token: DataTypes.STRING,

        fcm_token : DataTypes.STRING
    }, {
        setterMethods: {
            addStar(review_star) {
                let nowTotalStar = this.getDataValue('total_star');
                let nowReviewNumber = this.getDataValue('num_review');

                this.setDataValue('total_star', nowTotalStar + review_star);
                this.setDataValue('num_review', nowReviewNumber + 1);
            }
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}

// varchar max = 65532
// allowNull = true => null 허용