import React from 'react';
import { Button, Card, Typography, message, Upload } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import api from '../../config/request';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';

const { Title, Text } = Typography;

const ExportImport: React.FC = () => {
  const { t } = useTranslation();

  const exportDataMutation = useMutation({
    mutationFn: () => api.get('/api/v1/store-statistics/export').then((res) => res.data),
    onSuccess: (data) => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
      XLSX.writeFile(workbook, 'statistics.xlsx');
      message.success(t('exportImport.exportSuccess'));
    },
    onError: () => {
      message.error(t('exportImport.exportError'));
    },
  });

  const importDataMutation = useMutation({
    mutationFn: (data: any) => api.post('/api/v1/store-statistics/import', data),
    onSuccess: () => {
      message.success(t('exportImport.importSuccess'));
    },
    onError: () => {
      message.error(t('exportImport.importError'));
    },
  });

  const handleExport = () => {
    exportDataMutation.mutate();
  };

  const handleImport = (info: any) => {
    const file = info.file;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(worksheet);
      importDataMutation.mutate(json);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="export-import-container" style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#1a202c', marginBottom: 24 }}>
        {t('exportImport.title')}
      </Title>

      <Card
        style={{
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          padding: 24,
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <Button
            type="primary"
            size="large"
            icon={<DownloadOutlined />}
            onClick={handleExport}
            disabled={exportDataMutation.isLoading}
            style={{
              borderRadius: 8,
              backgroundColor: exportDataMutation.isLoading ? '#a0aec0' : '#3182ce',
              borderColor: exportDataMutation.isLoading ? '#a0aec0' : '#3182ce',
              height: 48,
              fontWeight: 500,
              boxShadow: '0 2px 6px rgba(49, 130, 206, 0.3)',
              transition: 'all 0.2s ease',
              marginRight: 16,
            }}
            aria-label={t('exportImport.export')}
          >
            {t('exportImport.export')}
          </Button>

          <Upload
            beforeUpload={() => false}
            onChange={handleImport}
            accept=".xlsx,.xls"
            showUploadList={false}
          >
            <Button
              type="primary"
              size="large"
              icon={<UploadOutlined />}
              disabled={importDataMutation.isLoading}
              style={{
                borderRadius: 8,
                backgroundColor: importDataMutation.isLoading ? '#a0aec0' : '#3182ce',
                borderColor: importDataMutation.isLoading ? '#a0aec0' : '#3182ce',
                height: 48,
                fontWeight: 500,
                boxShadow: '0 2px 6px rgba(49, 130, 206, 0.3)',
                transition: 'all 0.2s ease',
              }}
              aria-label={t('exportImport.import')}
            >
              {t('exportImport.import')}
            </Button>
          </Upload>
        </div>

        <Text style={{ color: '#4a5568' }}>
          {t('exportImport.description')}
        </Text>
      </Card>
    </div>
  );
};

export default ExportImport;