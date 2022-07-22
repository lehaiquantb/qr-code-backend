import { ProviderEntity } from '~provider/entity/provider.entity';
import { fileList } from './008.file.seed';
import { categoryList } from './007.category.seed';
import { ProductEntity } from '~product/entity/product.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute, Params, ParamsExtend } from '~database/factories';
import { CategoryEntity } from '~category/entity/category.entity';
import { TABLE_NAME } from '~database/constant';
import { FileEntity } from '~file/entity/file.entity';
dotenv.config();

export let productList: ParamsExtend<ProductEntity>[] = [
    {
        id: 1,
        name: 'Lon Nước Ngọt Có Gaz Pepsi (320ml/lon)',
        price: 9000,
        description: `Hương vị: Nước Ngọt Có Gas Pepsi Không Calo với hương cola hấp dẫn kết hợp cùng vị chanh thanh mát, không chỉ mang lại cảm giác sảng khoái, giải nhiệt tức thì mà còn tốt cho sức khỏe. Dùng trực tiếp, sẽ ngon hơn khi ướp lạnh, hoặc dùng với đá.
        Thiết kế bao bì chất liệu lon Matte nhám sang trọng lần đầu tiên xuất hiện trong ngành hàng Nước uống có gaz, giúp bạn có thể dễ dàng bảo quản cũng như mang theo sản phẩm trong các buổi tiệc, chuyến dã ngoại.
        Thiết kế: Lon 320ml tiện lợi
        Số lượng: 24 Lon/ thùng
        HSD: 09 tháng kể từ ngày sản xuất
        Bảo quản nơi sạch sẽ, khô ráo thoáng mát, tránh ánh nắng mặt trời.`,
        qrCode: '8934588672026',
        category: () => factoryExcute(CategoryEntity, categoryList[0]),
        image: () => factoryExcute(FileEntity, fileList[0]),
        verified: true,
        provider: () => factoryExcute(ProviderEntity, { id: 4 }),
    },
    {
        id: 2,
        name: 'Dầu Ăn Thượng Hạng Nhãn Hiệu Neptune Light 1L/2L/5L',
        price: 122000,
        description:
            'Dầu Ăn Thượng Hạng Nhãn Hiệu Neptune Light giảm hấp thụ cholesterol từ thực phẩm: Không những không chứa cholesterol, dầu ăn thượng hạng Neptune Light còn giúp cơ thể giảm hấp thụ cholesterol từ thực phẩm nhờ vào công thức vượt trội Healthy GP - đây là sự kết hợp tuyệt vời giữa 2 dưỡng chất Gamma-Oryzanol và Phytosterol có trong thành phần dầu. \n Thành phẩm hoàn toàn chất lượng và mang lại đầy đủ dưỡng chất tốt cho sức khỏe',
        qrCode: '89123456782',
        category: () => factoryExcute(CategoryEntity, categoryList[0]),
        image: () => factoryExcute(FileEntity, fileList[1]),
        verified: false,
        provider: () => factoryExcute(ProviderEntity, { id: 3 }),
    },
    {
        id: 3,
        name: 'Dưa hấu ruột đỏ 1kg',
        price: 30000,
        description: `Dưa hấu ruột đỏ tươi sạch, vị ngọt và hương vị đậm đà.`,
        qrCode: '89123456783',
        category: () => factoryExcute(CategoryEntity, categoryList[2]),
        image: () => factoryExcute(FileEntity, fileList[2]),
        verified: false,
        provider: () => factoryExcute(ProviderEntity, { id: 1 }),
    },
    {
        id: 4,
        name: 'Sườn già heo CP 500g',
        price: 33000,
        description: `Sườn già nhập khẩu từ Mỹ`,
        qrCode: '89123456784',
        category: () => factoryExcute(CategoryEntity, categoryList[3]),
        image: () => factoryExcute(FileEntity, fileList[3]),
        verified: false,
        provider: () => factoryExcute(ProviderEntity, { id: 1 }),
    },
    {
        id: 5,
        name: 'Combo 2Q: Tớ Học Lập Trình - Làm Quen Với Python + Clean code – Mã sạch và con đường trở thành lập trình viên giỏi',
        price: 510500,
        description: `Combo 2Q: Tớ Học Lập Trình - Làm Quen Với Python + Clean code – Mã sạch và con đường trở thành lập trình viên giỏi

        1.Tớ Học Lập Trình - Làm Quen Với Python 
        
        Sách hướng dẫn lập trình cho các bạn mới học cách dùng ngôn ngữ máy tính Python.
        
        Chỉ dẫn từng bước để bạn biết cách lập trình, tạo trò chơi, vẽ và làm đủ trò hay ho với Python.
        
        Chú giải các thuật ngữ máy tính đầy đủ và rõ ràng ở cuối sách.
        
        Thật nhiều trang web hữu ích để bạn tìm hiểu thêm trên mạng và tải về các mã lệnh cần thiết.
        
        Sách dành cho lứa tuổi 6+
        
        2.Clean code – Mã sạch và con đường trở thành lập trình viên giỏi
        
        Hiện nay, lập trình viên là một trong những nghề nghiệp được nhiều người lựa chọn theo đuổi và gắn bó. Đây là công việc đòi hỏi sự tỉ mỉ, nhiều công sức nhưng mang lại giá trị cao và một tương lai công việc hứa hẹn. Là một trong số những chuyên gia giàu kinh nghiệm, điêu luyện và lành nghề trong ngành, tác giả đã đúc rút từ kinh nghiệm của mình, viết về những tình huống trong thực tế, đôi khi có thể trái ngược với lý thuyết để xây dựng nên cuốn cẩm nang này, nhằm hỗ trợ những người đang muốn trở thành một lập trình viên chuyên nghiệp.`,
        qrCode: '89123456785',
        category: () => factoryExcute(CategoryEntity, categoryList[1]),
        image: () => factoryExcute(FileEntity, fileList[4]),
        verified: false,
        provider: () => factoryExcute(ProviderEntity, { id: 2 }),
    },
    {
        id: 6,
        name: 'Cho Tôi Xin Một Vé Đi Tuổi Thơ (Phiên Bản Đặc Biệt)',
        price: 372000,
        description: `Truyện Cho tôi xin một vé đi tuổi thơ là một trong những tác phẩm bán chạy nhất nhà văn Nguyễn Nhật Ánh. Nhà văn mời người đọc lên chuyến tàu quay ngược trở lại thăm tuổi thơ và tình bạn dễ thương của 4 bạn nhỏ. Những trò chơi dễ thương thời bé, tính cách thật thà, thẳng thắn một cách thông minh và dại dột, những ước mơ tự do trong lòng… khiến cuốn sách có thể làm các bậc phụ huynh lo lắng rồi thở phào. Không chỉ thích hợp với người đọc trẻ, cuốn sách còn có thể hấp dẫn và thực sự có ích cho người lớn trong quan hệ với con mình.

        Tác phẩm đạt giải thưởng văn học Asean 2010.
        
        Cho tôi xin một vé đi tuổi thơ đã được chuyển ngữ sang nhiều thứ tiếng như Tiếng Anh, Nhật, Hàn, Thái và phát hành tại nhiều nước thế giới.
        
        “Một câu chuyện ngụ ngôn làm say lòng người lớn và trẻ em. Cho tôi xin một vé đi tuổi thơ sẽ chiếm cảm tình của độc giả Mỹ - Amazon.
        
        Tác phẩm đầy mê hoặc này - gợi nhớ đến Hoàng tử bé của Saint-Exupery – đã khắc họa một cách tài tình sự đa cảm của tuổi thơ đối lập với những phi lý của thế giới người lớn – Publishers Weekly”
        
        Phiên bản đặc biệt kỷ niệm 40 năm ngày thành lập NXB Trẻ được in màu hoàn toàn với những tranh minh họa mới của họa sĩ Đỗ Hoàng Tường.`,
        qrCode: '89123456786',
        category: () => factoryExcute(CategoryEntity, categoryList[1]),
        image: () => factoryExcute(FileEntity, fileList[5]),
        verified: false,
        provider: () => factoryExcute(ProviderEntity, { id: 2 }),
    },
];

export class Product_1720963593422 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const promises = productList.map(async (item) =>
            factoryExcute(ProductEntity, item),
        );

        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.getRepository(TABLE_NAME.PRODUCT).clear();
    }
}
