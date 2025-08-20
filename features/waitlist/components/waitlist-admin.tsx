"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetWaitlistEntries } from "../queries";

export function WaitlistAdmin() {
  const { data, isLoading, error } = useGetWaitlistEntries();

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Waitlist - Administração</CardTitle>
          <CardDescription>
            Gerenciar inscrições na waitlist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              <span className="text-gray-600">Carregando inscrições...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Waitlist - Administração</CardTitle>
          <CardDescription>
            Gerenciar inscrições na waitlist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-600 mb-2">Erro ao carregar inscrições</p>
            <p className="text-sm text-gray-500">
              {error instanceof Error ? error.message : "Erro desconhecido"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const entries = data?.entries || [];
  const count = data?.count || 0;

  // Sort entries by creation date (most recent first)
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Waitlist - Administração</CardTitle>
        <CardDescription>
          {count === 0 
            ? "Nenhuma inscrição encontrada" 
            : `${count} ${count === 1 ? 'inscrição' : 'inscrições'} na waitlist`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {count === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg 
                className="w-16 h-16 mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" 
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma inscrição ainda
            </h3>
            <p className="text-gray-500">
              Quando alguém se inscrever na waitlist, as informações aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-4">
              {sortedEntries.map((entry, index) => (
                <div key={entry.id}>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="font-medium text-gray-900 text-lg">
                        {entry.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(entry.createdAt).toLocaleString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZone: 'America/Sao_Paulo'
                        })}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Detalhes do Projeto:</span>
                        <p className="text-gray-900 mt-1">{entry.projectDetails}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {entry.phoneNumber && (
                          <div>
                            <span className="text-sm font-medium text-gray-700">Telefone:</span>
                            <p className="text-gray-900">{entry.phoneNumber}</p>
                          </div>
                        )}
                        
                        {entry.companyName && (
                          <div>
                            <span className="text-sm font-medium text-gray-700">Empresa:</span>
                            <p className="text-gray-900">{entry.companyName}</p>
                          </div>
                        )}
                      </div>
                      
                      {!entry.phoneNumber && !entry.companyName && (
                        <div className="text-sm text-gray-500 italic">
                          Nenhuma informação adicional fornecida
                        </div>
                      )}
                    </div>
                  </div>
                  {index < sortedEntries.length - 1 && <div className="h-4" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}