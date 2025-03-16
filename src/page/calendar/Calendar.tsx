import * as React from 'react';
import { Calendar as AntCalendar, Badge, Card, Typography } from 'antd';
import type { Dayjs } from 'dayjs';

const { Title } = Typography;

interface PaymentEvent {
  type: 'success' | 'warning' | 'error';
  content: string;
}

const Calendar: React.FC = () => {
  
  // Bu funksiya har bir kun uchun to'lovlar ro'yxatini qaytaradi
  const getListData = (value: Dayjs) => {
    // Misol uchun statik ma'lumotlar
    // Amalda bu ma'lumotlar API dan olinadi
    const listData: PaymentEvent[] = [];
    
    // Kunning sanasi
    const day = value.date();
    
    // Misol uchun: har 5-kunda to'lov bor
    if (day % 5 === 0) {
      listData.push({
        type: 'warning',
        content: 'To\'lov muddati',
      });
    }
    
    // Misol uchun: har 7-kunda bajarilgan to'lov bor
    if (day % 7 === 0) {
      listData.push({
        type: 'success',
        content: 'To\'langan',
      });
    }
    
    // Misol uchun: har 10-kunda kechikkan to'lov bor
    if (day % 10 === 0) {
      listData.push({
        type: 'error',
        content: 'Kechikkan to\'lov',
      });
    }
    
    return listData;
  };

  // Kunlik ma'lumotlarni ko'rsatish
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>{t('calendar')}</Title>
      <Card>
        <AntCalendar
          cellRender={dateCellRender}
        />
      </Card>
    </div>
  );
};

export default Calendar;
